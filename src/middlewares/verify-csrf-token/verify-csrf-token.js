export default function buildVerifyCsrfToken({ jwt }) {
  return async function verifyCsrfToken({ token, userToken = null }) {
    if (!token) {
      throw new Error("Token is required!");
    }

    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_ANTICSRF, (error, data) => {
        if (error) reject(new Error("Invalid token!"));

        if (userToken) {
          if (data.userId && data.userId === userToken.userId) {
            resolve();
          }

          reject(new Error("User not authenticated!"));
        } else if (data.isGeneric) {
          resolve();
        }

        reject(new Error("Invalid token data!"));
      });
    });
  };
}
