export default function buildVerifyAuthToken({ sessionsDb, jwt }) {
  return async function verifyAuthToken({ token }) {
    if (!token) {
      throw new Error("Token is required!");
    }

    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_AUTHENTICATION, (error, user) => {
        if (error) reject(new Error("Invalid token!"));

        sessionsDb.smembers(user.userId, (error, members) => {
          if (error) reject(error);

          members.map((member) => {
            const object = JSON.parse(member);
            if (object.id === user.reqInfo.id) resolve(user);
          });

          reject(new Error("Token no longer valid!"));
        });
      });
    });
  };
}
