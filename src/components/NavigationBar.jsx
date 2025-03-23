import React, { useState } from "react";
import { LogOut, LogIn } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

export function NavigationBar() {
  const isLoggedInUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const userName = isLoggedInUser && isLoggedInUser.name;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleSignOut = async () => {
    try {
      dispatch(removeUser());
      removeCookie("user");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleSignIn = () => {
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
        {isLoggedInUser && userName ? (
          <p className="text-gray-700 font-semibold px-2 italic mt-2">Welcome {userName}</p>
        ) : (
          <p className="text-gray-500 font-semibold px-2 italic mt-2">
            Login to explore
          </p>
        )}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {isLoggedInUser ? (
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            ) : (
              <div className="w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11.25c1.794 0 3.25-1.456 3.25-3.25S13.794 4.75 12 4.75 8.75 6.206 8.75 8s1.456 3.25 3.25 3.25zm0 1.5c-2.828 0-8.25 1.416-8.25 4.25v1.25a.75.75 0 00.75.75h15a.75.75 0 00.75-.75V17c0-2.834-5.422-4.25-8.25-4.25z"
                  />
                </svg>
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a
                onClick={() => navigate("/profile")}
                className="justify-between"
              >
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
                  <span className="flex items-center gap-1">
                    Logout <LogOut size={20} className="text-white" />
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    Login <LogIn size={20} className="text-white" />
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
