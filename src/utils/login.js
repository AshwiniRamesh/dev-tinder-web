// login.js

// Helper function to set cookies
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${(value)}; expires=${expires}; path=/`;
};

export const login = (user) => {
  try {
    const users = JSON.parse(localStorage.getItem("usercredentials")) || [];
    const foundUser = users.find((u) => u.email === user.email);

    if (!foundUser) {
      throw new Error("User not found");
    }

    if (foundUser.password !== user.password) {
      throw new Error("Incorrect password");
    }

    // Set user details as cookies
    setCookie("user", JSON.stringify(foundUser), 10); // Expires in 7 days

    return foundUser;
  } catch (error) {
    console.error("Login error:", error.message);
    throw new Error(error.message);
  }
};

export const signup = (user) => {
  try {
    const users = JSON.parse(localStorage.getItem("usercredentials")) || [];
    const existingUser = users.find((u) => u.email === user.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    users.push(user);
    localStorage.setItem("usercredentials", JSON.stringify(users));

    // Set user details as cookies
    setCookie("user", JSON.stringify(user), 10);

    return user;
  } catch (error) {
    console.error("Signup error:", error.message);
    throw new Error(error.message);
  }
};
