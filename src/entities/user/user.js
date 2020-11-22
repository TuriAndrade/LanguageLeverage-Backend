export default function buildCreateUser({
  isValidLogin,
  isValidEmail,
  isValidPassword,
}) {
  return function createUser({
    login,
    password,
    name,
    picture,
    email,
    withNoPassword = false,
    /* 
      This is useful to update an user, because the password is hashed and I can't access it in plain text,
      so I have to create an user instance without password to check the rest of the data
    */
  } = {}) {
    if (!login) {
      throw new Error("Login is required!");
    } else if (!isValidLogin(login)) {
      throw new Error("Invalid login!");
    } else if (login.length < 4) {
      throw new Error("Login must have at least 4 characters!");
    } else if (login.length > 16) {
      throw new Error("Login must have at most 16 characters!");
    }

    if (!withNoPassword) {
      if (!password) {
        throw new Error("Password is required!");
      } else if (!isValidPassword(password)) {
        throw new Error("Invalid password!");
      } else if (password.length < 8) {
        throw new Error("Password must have at least 8 characters!");
      } else if (password.length > 24) {
        throw new Error("Password must have at most 24 characters!");
      }
    }

    if (!name) {
      throw new Error("Name is required!");
    } else if (name.length > 100) {
      throw new Error("Name must have at most 100 characters!");
    }

    if (!email) {
      throw new Error("Email is required!");
    } else if (!isValidEmail(email)) {
      throw new Error("Invalid email!");
    }

    return Object.freeze({
      getLogin: () => login,
      getPassword: () => (!withNoPassword ? password : undefined),
      getName: () => name,
      getEmail: () => email,
      getPicture: () => picture,
      hasPassword: () => !withNoPassword,
    });
  };
}
