const emailValidation = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const passwordValidation = (password) => {
  return password.length >= 6;
};

const nameValidation = (name) => {
  const nameRegex = /^[A-Za-z]+$/;
  return nameRegex.test(name);
};

const phoneValidation = (phone) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
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
