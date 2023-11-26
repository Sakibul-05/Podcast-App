import React from "react";
import { useSelector } from "react-redux";
import Button from "../components/CommonComponents/Button/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  console.log("user:", user);

  if (!user) {
    return <p>Loading...</p>;
  }

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
    <div>
      <h1>My Profile</h1>
      <h3>Name: {user?.name || "Not get"}</h3>
      <h3>Email: {user?.email || "Not get"}</h3>
      <h3>UID: {user?.uid || "Not get"}</h3>
      <Button text={"Logout"} onClick={handleLogout} />
    </div>
  );
};

export default ProfilePage;
