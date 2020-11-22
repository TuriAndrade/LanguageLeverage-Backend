export default function buildGetSpecificCsrfToken({ createToken }) {
  return function getSpecificCsrfToken({ userToken }) {
    if (!userToken) throw new Error("User token required!");

    const tokenData = {
      userId: userToken.userId,
    };

    const token = createToken(
      tokenData,
      process.env.JWT_ANTICSRF,
      60 * 15 // 15min
    );

    return token;
  };
}
