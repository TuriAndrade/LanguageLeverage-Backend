export default function isValidUser(user) {
  if (
    user.getLogin() &&
    (user.getPassword() || !user.hasPassword()) &&
    user.getName() &&
    user.getEmail()
  ) {
    return true;
  }
  return false;
}
