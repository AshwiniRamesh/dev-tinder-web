import React from 'react';
import { useSelector } from "react-redux";

export default function profile() {
  const user = useSelector((store) => store.user);
  console.log({user})
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
