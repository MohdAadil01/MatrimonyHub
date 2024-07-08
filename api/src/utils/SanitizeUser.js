module.exports = function removePasswordField(user) {
  // Create a copy of the user object to avoid mutating the original object
  const newUser = { ...user };

  // Delete the password field
  delete newUser.password;

  // Return the new object
  return newUser;
};
