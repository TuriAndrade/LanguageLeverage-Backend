export default function buildLogout({ sessionsDb }) {
  return function logout({ userToken }) {
    return new Promise((resolve, reject) => {
      sessionsDb.smembers(userToken.userId, (error, members) => {
        if (error) reject(error);

        members.map((member) => {
          const object = JSON.parse(member);
          if (userToken.reqInfo.id === object.id) {
            sessionsDb.srem(userToken.userId, member, (error, result) => {
              if (error) reject(error);
            });
          }
        });

        resolve();
      });
    });
  };
}
