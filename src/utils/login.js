// login.js

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

    return user;
  } catch (error) {
    console.error("Signup error:", error.message);
    throw new Error(error.message);
  }
};
