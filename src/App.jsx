import React, { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/CommonComponents/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import PrivateRoutes from "./components/CommonComponents/PrivateRoutes/PrivateRoutes";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePodcastPage from "./pages/CreatePodcastPage";
import PodcastsPage from "./pages/PodcastsPage";
import PodcastDetailsPage from "./pages/PodcastDetailsPage";
import CreateAnEpisodePage from "./pages/CreateAnEpisodePage";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                  profilePic: userData.profilePic,
                })
              );
            }
          },
          (error) => {
            console.log("Error fetching user data:", error);
          }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, [dispatch]);
  return (
    <div>
      <ToastContainer />
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<SignUpPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-podcast" element={<CreatePodcastPage />} />
            <Route
              path="/podcasts/:podcastId"
              element={<PodcastDetailsPage />}
            />
            <Route
              path="/podcasts/:podcastId/create-episode"
              element={<CreateAnEpisodePage />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
