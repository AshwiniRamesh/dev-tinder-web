export const validateInputFields = (email, password) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const isEmailValid = emailPattern.test(email);
  const isPasswordValid = passwordPattern.test(password);

  if (!isEmailValid) return "Invalid Email";
  if (!isPasswordValid) return "Invalid Password format";

  return null;
};
