import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../CommonComponents/Input/Input";
import Button from "../CommonComponents/Button/Button";
import FileInput from "../CommonComponents/Input/FileInput";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const CreatePodcastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit() {
    setIsLoading(true);
    if (title && desc && displayImage && bannerImage) {
      try {
        //1. upload files & get downloadable links
        //---- code for upload display image
        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}` // if i simply write any static value then everytime i upload file that replace previous file in the firebase
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageURL = await getDownloadURL(displayImageRef);
        console.log("bannerImageURL:", displayImageURL);

        // ----code for upload banner image
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}` // if i simply write any static value then everytime i upload file that replace previous file in the firebase
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageURL = await getDownloadURL(bannerImageRef);
        console.log("bannerImageURL:", bannerImageURL);

        //saving the podcast details in firebase
        const podcastData = {
          title: title,
          description: desc,
          displayImage: displayImageURL,
          bannerImage: bannerImageURL,
          createdBy: auth.currentUser.uid,
        };

        //2. create a new doc in a new collection called podcasts
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        //after done all the asynchronous operation
        setTitle("");
        setDesc("");
        setDisplayImage(null);
        setBannerImage(null);
        setIsLoading(false);
        toast.success("Image Uploaded");
        //3. save this new podcasts episodes states in out podcasts
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast.error("All inputs fields are requiered");
    }
  }

  function displayImageHandle(file) {
    setDisplayImage(file);
  }
  function bannerImageHandle(file) {
    setBannerImage(file);
  }
  return (
    <>
      <Input
        type="text"
        placeholder="Title"
        state={title}
        setState={setTitle}
        required={true}
      />

      <Input
        type="text"
        placeholder="Description"
        state={desc}
        setState={setDesc}
        required={true}
      />

      <FileInput
        accept={"image/*"}
        id="display-iamge-input"
        fileHandleFn={displayImageHandle}
        text="Display Image"
      />
      <FileInput
        accept={"image/*"}
        id="banner-iamge-input"
        fileHandleFn={bannerImageHandle}
        text="Banner Image Upload"
      />
      <Button
        text={isLoading ? "Loading..." : "Create Podcast"}
        disabled={isLoading}
        onClick={handleSubmit}
      />
    </>
  );
};

export default CreatePodcastForm;
