import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../../src/components/CommonComponents/Button/Button";
import AudioPlaer from "../components/CommonComponents/Podcast/AudioPlayer";

const PodcastDetailsPage = () => {
  const { podcastId } = useParams();
  const navigate = useNavigate();
  console.log(podcastId);
  const [podcastDetails, setPodcastDetails] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState("");

  // console.log("episodes:", episodes);
  // console.log("podcastDetails:", podcastDetails);
  useEffect(() => {
    if (podcastId) {
      //fetch data
      async function getData() {
        const docRef = doc(db, "podcasts", podcastId);
        const docSnap = await getDoc(docRef);

        try {
          if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            setPodcastDetails({ id: podcastId, ...docSnap.data() }); //whatever object got that destructure
            // toast.success("Podcast Found!");
          } else {
            // doc.data() will be undefined in this case
            // console.log("No such document!");
            toast.error("No such document!");
          }
        } catch (error) {
          // console.log("Error getting document:", error);
          toast.error(error.toString());
        }
      }
      getData();
    }
  }, [podcastId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", podcastId, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        toast.error("Error in fetching episodes!");
      }
    );
    return () => {
      unsubscribe();
    };
  }, [podcastId]);

  return (
    <div className="PodcastDetails">
      {podcastId ? (
        <>
          <div className="title-and-createButton-flex">
            <h1 className="podcast-title">{podcastDetails.title}</h1>
            {/* when user login with different account user can't see the button */}
            {podcastDetails.createdBy === auth.currentUser.uid && (
              <Button
                text="Create Episode"
                onClick={() =>
                  navigate(`/podcasts/${podcastId}/create-episode`)
                }
              />
            )}
          </div>
          <div className="banner-wrapper">
            <img src={podcastDetails.bannerImage} alt={podcastDetails.title} />
          </div>
          <p className="podcast-desc">{podcastDetails.description}</p>
          <h1>Episodes</h1>
          <div className="episodes-container">
            {episodes.length > 0 ? (
              episodes.map((episode, index) => (
                <div key={episode.id} className="episodes-row">
                  <div className="episodes-grid">
                    <div className="episode-number-flex">{index + 1}</div>
                    <div className="title-desc-button-flex">
                      <h3>{episode.title}</h3>
                      <p>{episode.description}</p>
                      <button onClick={() => setPlayingFile(episode)}>
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3 style={{ color: "var(--purple-grey)" }}>
                Episodes will upload soon...
              </h3>
            )}
          </div>
        </>
      ) : (
        <>
          <h1>No Details</h1>
          <Button text="Go Back" onClick={() => navigate(-1)} />
        </>
      )}
      <div className="custom-player-container">
        {playingFile && (
          <AudioPlaer
            playingFile={playingFile}
            displayImage={podcastDetails.displayImage}
          />
        )}
      </div>
    </div>
  );
};

export default memo(PodcastDetailsPage);
