import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/CommonComponents/Podcast/PodcastCart/PodcastCard";
import Input from "../components/CommonComponents/Input/Input";

const PodcastsPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { podcasts } = useSelector((store) => store.podcasts);
  console.log("podcasts=>", podcasts);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapShot) => {
        const podcastsData = [];
        querySnapShot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.log("Error getting documents", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  let filteredPodcasts = podcasts.filter((item) =>
    item.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="PodcastsPage">
      <h2>Discover Podcasts</h2>
      <Input
        type="text"
        placeholder="Search"
        state={search}
        setState={setSearch}
        required={true}
      />
      {filteredPodcasts.length > 0 ? (
        <div className="podcast-flex">
          {filteredPodcasts.map((item) => (
            <PodcastCard
              key={item.id}
              id={item.id}
              title={item.title}
              displayImage={item.displayImage}
            />
          ))}
        </div>
      ) : (
        <>
          <p>{search ? "Not Found" : "No Podcasts Available"}</p>
        </>
      )}
    </div>
  );
};

export default PodcastsPage;
