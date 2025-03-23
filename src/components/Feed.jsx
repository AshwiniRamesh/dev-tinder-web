import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userFeed } from "../data/feed";
import { addFeed } from "../utils/feedSlice";
import { UserCard } from "./UserCard";

export function Feed() {
  const isLoggedInUser = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedInUser) navigate("/login");
  }, [isLoggedInUser, navigate]);

  const getFeed = () => {
          if (feed && feed.length > 0) return;
          try {
            dispatch(addFeed(userFeed));
          } catch (err) {
            console.error("Error while setting user feed to store:", err.message);
          }
        };
        

  useEffect(() => {
    if (isLoggedInUser) getFeed();
  }, [isLoggedInUser]);

  return (
    <div>
      {feed && feed.length > 0 ? (
        <UserCard feed={feed} />
      ) : (
        <p>Loading feed...</p>
      )}
    </div>
  );
}
