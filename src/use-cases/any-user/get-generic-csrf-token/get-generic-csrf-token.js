export default function buildGetGenericCsrfToken({ createToken }) {
  return function getGenericCsrfToken() {
    const tokenData = {
      isGeneric: true,
    };

    const token = createToken(
      tokenData,
      process.env.JWT_ANTICSRF,
      60 * 15 // one week
    );

    return token;
  };
}
