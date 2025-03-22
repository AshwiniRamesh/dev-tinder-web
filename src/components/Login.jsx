import React, { useState, useRef, useCallback } from "react";
import { validateInputFields } from "../utils/validate";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { login, signup } from "../utils/login";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const phone = useRef(null);

  // Toggle between Sign In and Sign Up
  const toggleSignInForm = useCallback(() => {
    setIsSignIn((prev) => !prev);
    setErrorMessage(null);
  }, [isSignIn]);
  // Reset the form fields
  const resetForm = () => {
    [email, password, name, phone].forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });
  };
  const updateUser = async (user) => {
    try {
      dispatch(addUser(user));
      navigate("/profile");
    } catch (error) {
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  // Handle sign-in or sign-up
  const handleButtonClick = async () => {
    setErrorMessage(null);
    const error = validateInputFields(
      email.current.value,
      password.current.value
    );
    if (error) return setErrorMessage(error);

    try {
      let user;
      if (isSignIn) {
        // Sign in
        user = login({email:email.current.value, password:password.current.value});
      } else {
        // Sign up
        user = signup({email:email.current.value, password:password.current.value,
          phone:phone.current.value, name:name.current.value});
      }
      await updateUser(user);
      resetForm();
    } catch (err) {
      setErrorMessage(err.message || "An error occurred. Please try again.");
      resetForm();
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="card card-border bg-base-100 w-96">
      <div className="card-body">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-80 p-8 bg-black bg-opacity-70 rounded-xl shadow-lg space-y-4"
        >
          <h1 className="font-bold text-3xl py-4 text-white shadow-md">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignIn && (
            <>
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                ref={phone}
                type="number"
                placeholder="Phone Number"
                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </>
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            className="w-full p-3 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            onClick={handleButtonClick}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          {errorMessage && (
            <p className="py-2 text-red-500 font-semibold">{errorMessage}</p>
          )}
          <p
            className="py-2 text-white cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignIn
              ? "New to Dev Tinder? Sign Up now"
              : "Already registered? Sign In now"}
          </p>
        </form>
      </div>
    </div>
   </div>
  );
}
