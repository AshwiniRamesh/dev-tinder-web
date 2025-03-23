import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { userFeed } from "../data/feed";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function EditProfile() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    phone: "",
    age: "",
    gender: "male",
    isPremium: false,
    membershipType: "",
    photoUrl: "",
    about: "",
    skills: "",
  });

  useEffect(() => {
    try {
      const currentUser = Cookies.get("user");
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        const email = parsedUser.emailId;

        const userData = userFeed.find((item) => item.emailId === email);
        console.log("User data from feed:", userData);

        if (userData) {
          setFormData({ ...formData, ...userData });
        }
      }
    } catch (error) {
      console.error("Error parsing user from cookies:", error.message);
      toast.error("Failed to load user data.", { autoClose: 10000 });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCookie("user", JSON.stringify(formData), 10);
      dispatch(addUser(formData));
      toast.success("Profile updated successfully!", { autoClose: 5000 });
    } catch (err) {
      console.log(`Error while updating profile: ${err.message}`);
      toast.error("Error while updating profile", { autoClose: 10000 });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => {
          if (["password", "createdAt", "updatedAt"].includes(key)) return null;
          return (
            <div key={key} className="flex flex-col">
              <label className="mb-1 font-medium capitalize">{key}</label>
              {key === "gender" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : key === "isPremium" ? (
                <input
                  type="text"
                  value={formData[key] ? "Yes" : "No"}
                  readOnly
                  className="p-2 border rounded-md bg-gray-100"
                />
              ) : (
                <input
                  type="text"
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              )}
            </div>
          );
        })}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
