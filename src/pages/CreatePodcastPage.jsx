import React from "react";
import CreatePodcastForm from "../components/StartAPodcast/CreatePodcastForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePodcastPage = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  return (
    <div className="flex-input-wrapper">
      <div className="input-wrapper">
        {user ? (
          <>
            <h1>Create A Podcast</h1>
            <CreatePodcastForm />
          </>
        ) : (
          <>
            <h2>You are not logged in! Please log in.</h2>
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                width: "100%",
                marginTop: "1.5rem",
                fontSize: "1.2rem",
              }}
            >
              Click Here
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePodcastPage;
