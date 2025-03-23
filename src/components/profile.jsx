import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function profile() {
  const isLoggedInUser = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedInUser) navigate("/login");
  }, [isLoggedInUser, navigate]);

  return (
    <div>profile</div>
  )
}

// {
//   "email": "ashwini.a.h.r@accenture.com",
//   "password": "Ashwini@123",
//   "phone": "400123456",
//   "name": "Ashwini H R"
// }
