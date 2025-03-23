import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Connections() {
  const isLoggedInUser = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedInUser) navigate("/login");
  }, [isLoggedInUser, navigate]);

  return <div>Connections</div>;
}
