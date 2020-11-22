export default function buildLogin({
  User,
  Admin,
  Editor,
  sessionsDb,
  createToken,
  bcrypt,
  crypto,
}) {
  return async function login({ login, password, reqIp }) {
    const user = await User.findOne({
      where: {
        login,
      },
    });

    if (user) {
      const correctPassword = await bcrypt.compare(password, user.passwordHash);

      if (!correctPassword) {
        throw new Error("Incorrect password!");
      }

      const isAdmin = await Admin.findOne({
        where: {
          userId: user.id,
        },
      });

      const isEditor = await Editor.findOne({
        where: {
          userId: user.id,
        },
      });

      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) reject(err);

          const reqInfo = {
            ip: reqIp,
            id: hash.toString("hex"),
            date: Date.now(),
          };

          sessionsDb.sadd(user.id, JSON.stringify(reqInfo), (error, result) => {
            if (error) reject(error);

            const tokenData = {
              userId: user.id,
              adminId: isAdmin ? isAdmin.id : undefined,
              editorId: isEditor ? isEditor.id : undefined,
              reqInfo,
              isValidated: isEditor ? isEditor.isValidated : undefined,
              hasFullPermission: isAdmin
                ? isAdmin.hasFullPermission
                : undefined,
            };

            const token = createToken(
              tokenData,
              process.env.JWT_AUTHENTICATION,
              60 * 60 * 24 * 7 // one week
            );

            resolve({
              token,
              isAdmin: isAdmin ? true : undefined,
              isEditor: isEditor ? true : undefined,
              isValidated: isEditor ? isEditor.isValidated : undefined,
              hasFullPermission: isAdmin
                ? isAdmin.hasFullPermission
                : undefined,
            });
          });
        });
      });
    }
    const isThereAnyAdmin = await Admin.findAll();

    if (
      isThereAnyAdmin.length === 0 &&
      login === process.env.DEFAULT_LOGIN &&
      password === process.env.DEFAULT_PASSWORD
    ) {
      const createdUser = await User.create({
        login: process.env.DEFAULT_LOGIN,
        password: process.env.DEFAULT_PASSWORD,
        name: "defaultName",
        email: "default@email.com",
      });

      const createdAdmin = await Admin.create({
        hasFullPermission: true,
        userId: createdUser.id,
      });

      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) reject(err);

          const reqInfo = {
            ip: reqIp,
            id: hash.toString("hex"),
            date: Date.now(),
          };

          sessionsDb.sadd(
            createdUser.id,
            JSON.stringify(reqInfo),
            (error, result) => {
              if (error) reject(error);

              const tokenData = {
                userId: createdUser.id,
                adminId: createdAdmin.id,
                hasFullPermission: true,
                reqInfo,
              };

              const token = createToken(
                tokenData,
                process.env.JWT_AUTHENTICATION,
                60 * 60 * 24 * 7 // one week
              );

              resolve({
                token,
                isAdmin: true,
                firstAdmin: true,
                hasFullPermission: true,
              });
            }
          );
        });
      });
    }

    throw new Error("No user found with this login!");
  };
}
