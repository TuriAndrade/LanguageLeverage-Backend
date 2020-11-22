export default function isValidLogin(login) {
  if (/^[a-z0-9_.]+$/.test(login)) {
    return true;
  }
  return false;
}
