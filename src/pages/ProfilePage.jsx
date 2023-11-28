import React from "react";
import { useSelector } from "react-redux";
import Button from "../components/CommonComponents/Button/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  console.log("user:", user);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        toast.error(`Error: ${error}`);
      });
  }

  return (
    <div className="flex-input-wrapper">
      <div className="input-wrapper">
        {user ? (
          <>
            <h1>My Profile</h1>
            <h3>Name: {user?.name || "Not get"}</h3>
            <h3>Email: {user?.email || "Not get"}</h3>
            <h3>UID: {user?.uid || "Not get"}</h3>
            <Button text={"Logout"} onClick={handleLogout} />
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

export default ProfilePage;
