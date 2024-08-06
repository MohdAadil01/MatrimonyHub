const emailValidation = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const passwordValidation = (password) => {
  return password.length >= 6;
};

const nameValidation = (name) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name.trim());
};

const phoneValidation = (phone) => {
  const phoneRegex = /^\d{10}$/;

  if (typeof phone === "string" && phoneRegex.test(phone)) {
    return true;
  } else {
    return false;
  }
};

const priceValidation = (price) => {
  return typeof price === "number" && price > 0;
};

module.exports = {
  emailValidation,
  passwordValidation,
  nameValidation,
  phoneValidation,
  priceValidation,
};
