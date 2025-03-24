import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userConnections } from "../data/connections";
import {addConnection} from '../utils/connectionsSlice'

export function Connections() {
  const isLoggedInUser = useSelector((store) => store.user);
  const connectionsFromStore = useSelector((store) => store.connections);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    if (!isLoggedInUser) {
      navigate("/login");
    } else {
      const currentUser = userConnections.find(
        (item) => item.email === isLoggedInUser.emailId
      );
      if (currentUser) {
        setConnections(currentUser.connections);
        dispatch(addConnection(currentUser.connections));
        console.log({connectionsFromStore})
      }
    }
  }, [isLoggedInUser, navigate]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Connections</h1>
      <ul className="space-y-2">
        {connections.map((connection, index) => (
          <li
            key={index}
            className="p-4 bg-gray-100 rounded-md shadow-md flex items-center"
          >
            <img
              src={connection.photoUrl}
              alt={`${connection.firstName} ${connection.lastName}`}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {connection.firstName} {connection.lastName}
              </h2>
              <p className="text-gray-600">{connection.about}</p>
              <p className="text-gray-500">Connected Since: {connection.connectedSince}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
