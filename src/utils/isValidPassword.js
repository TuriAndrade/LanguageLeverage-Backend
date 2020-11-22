export default function isValidPassword(password) {
  if (/^[A-Za-z0-9_.]+$/.test(password)) {
    return true;
  }
  return false;
}
