export default function buildCompleteLogout({ sessionsDb, User, bcrypt }) {
  return async function completeLogout({ userToken, password, sessions = [] }) {
    if (!userToken) {
      throw new Error("User token required!");
    }

    if (sessions.length === 0) {
      throw new Error("Sessions are required!");
    }

    const user = await User.findOne({
      where: {
        id: userToken.userId,
      },
    });

    if (!user) {
      throw new Error("No user found with this id!");
    }

    const correctPassword = await bcrypt.compare(password, user.passwordHash);

    if (!correctPassword) {
      throw new Error("Incorrect password!");
    }

    return new Promise((resolve, reject) => {
      sessionsDb.smembers(userToken.userId, (error, members) => {
        if (error) reject(error);

        let thisSessionIncluded = false;

        members.map((member) => {
          const object = JSON.parse(member);
          if (sessions.includes(object.id)) {
            if (userToken.reqInfo.id === object.id) thisSessionIncluded = true;
            sessionsDb.srem(userToken.userId, member, (error, result) => {
              if (error) reject(error);
            });
          }
        });

        resolve({
          thisSessionIncluded,
        });
      });
    });
  };
}
