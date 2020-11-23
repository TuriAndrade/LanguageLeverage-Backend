export default function buildGetSessions({ sessionsDb, geoIp }) {
  return function getSessions({ userToken }) {
    return new Promise((resolve, reject) => {
      sessionsDb.smembers(userToken.userId, (error, members) => {
        if (error) reject(error);

        const array = members.map((member) => {
          const info = JSON.parse(member);

          const geoData = geoIp.lookup(info.ip);

          return {
            ...info,
            ...geoData,
            active: userToken.reqInfo.id === info.id,
          };
        });

        resolve(array);
      });
    });
  };
}
