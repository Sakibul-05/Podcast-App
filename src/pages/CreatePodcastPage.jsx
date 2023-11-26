import React from "react";
import CreatePodcastForm from "../components/StartAPodcast/CreatePodcastForm";

const CreatePodcastPage = () => {
  return (
    <div className="flex-input-wrapper">
      <div className="input-wrapper">
        <h1>Create A Podcast</h1>
        <CreatePodcastForm />
      </div>
    </div>
  );
};

export default CreatePodcastPage;
