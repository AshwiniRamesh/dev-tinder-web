import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userConnections } from "../data/connections";
import { addConnection } from "../utils/connectionsSlice";

export function Connections() {
  const isLoggedInUser = useSelector((store) => store.user);
  const connectionsFromStore = useSelector((store) => store.connections);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedInUser) {
      navigate("/login");
    } else {
      const currentUser = userConnections.find(
        (item) => item.email === isLoggedInUser?.emailId
      );
      if (currentUser) {
        dispatch(addConnection(currentUser.connections));
      }
    }
    setLoading(false);
  }, [isLoggedInUser, dispatch, navigate]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading connections...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Connections</h1>
      {connectionsFromStore.length === 0 ? (
        <p className="text-gray-600">No connections at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {connectionsFromStore.map((connection, index) => (
            <li
              key={index}
              className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4"
            >
              <img
                src={connection.photoUrl}
                alt={`${connection.firstName} ${connection.lastName}`}
                className="w-14 h-14 rounded-full border border-gray-300"
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {connection.firstName} {connection.lastName}
                </h2>
                <p className="text-gray-600">{connection.about}</p>
                <p className="text-gray-500 text-sm">
                  Connected Since: {connection.connectedSince}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Connections;
