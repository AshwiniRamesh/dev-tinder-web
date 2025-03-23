import React, { useEffect } from "react";
import { NavigationBar } from "./NavigationBar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

export function Body() {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      try {
        return JSON.parse(parts.pop().split(";").shift());
      } catch (error) {
        console.error("Error parsing cookie:", error.message);
        return null;
      }
    }
    return null;
  };

  const isLoggedInUser = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getCookie("user");
    if (user && !isLoggedInUser) {
      // console.log("User found in cookie:", user);
      dispatch(addUser(user));
      navigate("/profile");
    } else if (!user && !isLoggedInUser) {
      navigate("/login");
    }
  }, [isLoggedInUser, navigate, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
