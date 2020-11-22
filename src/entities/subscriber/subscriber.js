export default function buildCreateSubscriber({ isValidEmail }) {
  return function createSubscriber({ name, email } = {}) {
    if (!name) {
      throw new Error("Name is required!");
    } else if (name.length > 50) {
      throw new Error("Name must have at most 50 characters!");
    }

    if (!email) {
      throw new Error("Email is required!");
    } else if (!isValidEmail(email)) {
      throw new Error("Invalid email!");
    }

    return Object.freeze({
      getName: () => name,
      getEmail: () => email,
    });
  };
}
