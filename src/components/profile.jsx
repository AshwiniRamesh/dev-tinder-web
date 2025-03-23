import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {EditProfile} from './EditProfile';

export default function profile() {
  const isLoggedInUser = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedInUser) navigate("/login");
  }, [isLoggedInUser, navigate]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4"> Edit Profile Deatils </h1>
      <EditProfile />
    </div>
  )
}
