const emailValidation = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const passwordValidation = (password) => {
  return password.length >= 6;
};

const nameValidation = (firstName, lastName) => {
  const nameRegex = /^[A-Za-z]+$/;
  return nameRegex.test(firstName) && nameRegex.test(lastName);
};

const phoneValidation = (phone) => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
};

module.exports = {
  emailValidation,
  passwordValidation,
  nameValidation,
  phoneValidation,
};
