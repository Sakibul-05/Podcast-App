import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/CommonComponents/Podcast/PodcastCart/PodcastCard";
import Input from "../components/CommonComponents/Input/Input";
import Loader from "../components/CommonComponents/Loader";

const PodcastsPage = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { podcasts } = useSelector((store) => store.podcasts);
  console.log("podcasts=>", podcasts);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapShot) => {
        const podcastsData = [];
        querySnapShot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
        setIsLoading(false);
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {search ? (
            <div className="podcast-flex">
              {filteredPodcasts.length > 0 ? (
                <>
                  {filteredPodcasts.map((item) => (
                    <PodcastCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      displayImage={item.displayImage}
                    />
                  ))}
                </>
              ) : (
                <>
                  <p>Not Found!</p>
                </>
              )}
            </div>
          ) : (
            <div className="podcast-flex">
              {podcasts.length > 0 ? (
                <>
                  {podcasts.map((item) => (
                    <PodcastCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      displayImage={item.displayImage}
                    />
                  ))}
                </>
              ) : (
                <>
                  <p>No Podcasts Available</p>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PodcastsPage;
