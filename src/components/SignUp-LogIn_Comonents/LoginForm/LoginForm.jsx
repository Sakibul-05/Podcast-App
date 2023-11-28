import React, { useState } from "react";
import Input from "../../CommonComponents/Input/Input";
import Button from "../../CommonComponents/Button/Button";
import { db, auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";

const LoginForm = ({ isLoading, setIsLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogin() {
    // handle login
    setIsLoading(true);
    try {
      // creating user's account
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User: ", user); // firebase user object

      // getting user's details from the "users" collection
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();
      console.log("userData: ", userData);

      // saving user's details into redux
      dispatch(
        setUser({
          name: userData.name,
          email: user.email,
          uid: user.uid,
          // photoURL: user.photoURL,
        })
      );
      setIsLoading(false);
      toast.success("Login Success");
      // redirect to profile page after successful login
      navigate("/profile");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Please Make Sure Email and Password is Correct");
    }
  }
  return (
    <>
      <div>
        <Input
          type="email"
          placeholder="Email_ID"
          state={email}
          setState={setEmail}
          required={true}
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          state={password}
          setState={setPassword}
          required={true}
        />
      </div>

      <Button
        text={isLoading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={isLoading}
      />
    </>
  );
};

export default LoginForm;
