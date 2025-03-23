import React from "react";

export function UserCard({ feed }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {feed.map((user, index) => (
        <div
          key={index}
          className="card bg-base-100 w-full shadow-md rounded-2xl overflow-hidden"
        >
          <figure>
            <img
              src={user.photoUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-48 object-cover"
            />
          </figure>
          <div className="card-body p-4">
            <h2 className="card-title text-xl font-semibold">
              {user.firstName} {user.lastName}{" "}
              {user.isPremium && (
                <span className="badge badge-success ml-2">
                  {user.membershipType} Member
                </span>
              )}
            </h2>
            <p className="text-gray-600">Gender: {user.gender}</p>
            <p className="text-gray-600">Age: {user.age}</p>
            <p className="text-gray-600">About: {user.about}</p>
            <p className="text-gray-600">
              Skills: {user.skills.join(", ")}
            </p>
            <p className="text-gray-500 text-sm">
              Joined: {new Date(user.createdAt).toDateString()}
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="btn btn-primary"
                onClick={() => console.log("Interested in", user.firstName)}
              >
                Interested
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => console.log("Ignored", user.firstName)}
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
