import React, { useState } from "react";
import { LogOut, LogIn } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  removeUser } from "../utils/userSlice";

export function NavigationBar() {
  const isLoggedInUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
console.log({isLoggedInUser})
  const handleSignOut = async () => {
    console.log("out")
    try {
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleSignIn = () => {
    console.log("in")
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Dev Tinder</a>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={toggleTheme}>
          Toggle Theme
        </button>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a onClick={() => navigate("/profile")} className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/connections")}>Connections</a>
            </li>
            <li>
              <button
                onClick={isLoggedInUser ? handleSignOut : handleSignIn}
                className="btn btn-primary text-white font-semibold hover:underline flex items-center space-x-1"
              >
                {isLoggedInUser ? (
                  <span  className="flex items-center gap-1">Logout <LogOut size={20} className="text-white" /></span>
                ) : (
                 <span  className="flex items-center gap-1">Login  <LogIn size={20} className="text-white" /></span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
