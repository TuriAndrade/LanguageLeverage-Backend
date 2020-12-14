const redis = require("redis");

const sessionsDb = redis.createClient({
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

sessionsDb.on("error", (error) => {
  console.error(error);
});

export default sessionsDb;
