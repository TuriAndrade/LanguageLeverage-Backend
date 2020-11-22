const redis = require("redis");

const sessionsDb = redis.createClient();

sessionsDb.on("error", (error) => {
  console.error(error);
});

export default sessionsDb;
