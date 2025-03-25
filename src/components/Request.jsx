import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connectRequests } from "../data/request";
import { addRequest, removeRequest } from "../utils/requestsSlice";
import { updateConnection } from "../utils/connectionsSlice";

export function Request() {
  const isLoggedInUser = useSelector((store) => store.user);
  const requestsFromStore = useSelector((store) => store.requests);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toast, setToast] = useState({ message: "", type: "" });

  // Find current user's requests efficiently using useMemo
  const currentUserRequests = useMemo(() => {
    return connectRequests.find((item) => item.email === isLoggedInUser?.emailId)?.requests || [];
  }, [isLoggedInUser]);

  useEffect(() => {
    if (!isLoggedInUser) {
      navigate("/login");
    } else {
      dispatch(addRequest(currentUserRequests));
    }
  }, [isLoggedInUser, dispatch, navigate, currentUserRequests]);

  // Show Toast Notification
  const showToast = useCallback((message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 2000);
  }, []);

  // Accept Request
  const handleAccept = useCallback(
    (emailId) => {
      const newConnection = requestsFromStore.find((user) => user.emailId === emailId);
      if (newConnection) {
        dispatch(updateConnection(newConnection));
        dispatch(removeRequest(emailId));
        showToast("Connection Accepted!", "success");
      }
    },
    [dispatch, requestsFromStore, showToast]
  );

  // Ignore Request
  const handleDelete = useCallback(
    (emailId) => {
      dispatch(removeRequest(emailId));
      showToast("Request Ignored", "error");
    },
    [dispatch, showToast]
  );

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Friend Requests</h1>

      {/* Toast Notification */}
      {toast.message && (
        <div className="toast fixed top-4 right-4 z-50 transition-opacity duration-500">
          <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"} shadow-lg`}>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    toast.type === "success"
                      ? "M5 13l4 4L19 7"
                      : "M6 18L18 6M6 6l12 12"
                  }
                />
              </svg>
              <span>{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      {requestsFromStore.length === 0 ? (
        <p className="text-gray-600">No friend requests at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {requestsFromStore.map((request) => (
            <li
              key={request.emailId}
              className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={request.photoUrl}
                  alt={`${request.firstName} ${request.lastName}`}
                  className="w-16 h-16 rounded-full border border-gray-300"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {request.firstName} {request.lastName}
                  </h2>
                  <p className="text-gray-600">{request.about}</p>
                  <p className="text-gray-500 text-sm">
                    Mutual Connections: {request.mutualConnections}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Request Sent: {request.requestSentOn}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleAccept(request.emailId)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(request.emailId)}
                >
                  Ignore
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Request;
