import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/CommonComponents/Input/Input";
import FileInput from "../components/CommonComponents/Input/FileInput";
import Button from "../components/CommonComponents/Button/Button";
import { toast } from "react-toastify";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CreateAnEpisodePage = () => {
  const { podcastId } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function audioFileHandle(file) {
    setAudioFile(file);
  }

  async function handleSubmit() {
    setIsLoading(true);
    if (title && desc && audioFile && podcastId) {
      try {
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);
        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
          title: title,
          description: desc,
          audioURL: audioURL,
        };

        await addDoc(
          collection(db, "podcasts", podcastId, "episodes"),
          episodeData
        );
        setIsLoading(false);
        toast.success("Episode Created Successfully");
        setTitle("");
        setAudioFile("");
        setDesc("");
        navigate(`/podcasts/${podcastId}`);
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    } else {
      toast.error("All fields are required!");
      setIsLoading(false);
    }
  }

  return (
    <div className="CreateAnEpisode">
      <div className="input-wrapper">
        <h1 className="heading">Create An Episode</h1>
        <Input
          type="text"
          state={title}
          setState={setTitle}
          placeholder="Title"
          required={true}
        />
        <Input
          type="text"
          state={desc}
          setState={setDesc}
          placeholder="Description"
          required={true}
        />
        <FileInput
          accept={"audio/*"} //which media(video/audio) want to accept
          id="audio-file-input"
          fileHandleFn={audioFileHandle}
          text="Upload Audio File"
        />
        <Button
          text={isLoading ? "Loading..." : "Create Episode"}
          disabled={isLoading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateAnEpisodePage;
