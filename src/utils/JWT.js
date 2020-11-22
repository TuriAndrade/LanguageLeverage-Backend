const jwt = require("jsonwebtoken");

function createToken(json, secret, expiresInSeconds) {
  // 1. Don't use password, email and other sensitive fields
  // 2. Use the information that are useful in other parts
  if (!json) return null;

  // OBS: If a callback is supplied, most jwt methods become asynchronous. If not, they are synchronous

  if (secret) {
    return jwt.sign(json, secret, {
      // As there is no callback, this is synchronous
      expiresIn: expiresInSeconds,
    });
  }
  return null;
}

module.exports = {
  createToken,
};
