import React, { useState } from "react";
import Input from "../../CommonComponents/Input/Input";
import Button from "../../CommonComponents/Button/Button";
import { db, auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = ({ isLoading, setIsLoading }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSignup() {
    // handle signup
    setIsLoading(true);
    if (password === confirmPassword && password.length >= 6) {
      try {
        // creating user's account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("User: ", user); // firebase user object

        // saving user's details in the "users" collection
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
          // photoURL: user.photoURL,
        });

        // saving user's details into redux
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
            // photoURL: user.photoURL,
          })
        );
        setIsLoading(false);
        toast.success("User has been created");
        // redirect to profile page after successful login
        navigate("/profile");
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast.error("This user is already exist");
      }
    } else {
      //give an error message
      setIsLoading(false);
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password is not same");
      } else if (password.length <= 6) {
        toast.error("Password should contains atleast 6 charecters");
      }
    }
  }
  return (
    <>
      <div>
        <Input
          type="text"
          placeholder="UserName"
          state={fullName}
          setState={setFullName}
          required={true}
        />
      </div>
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
      <div>
        <Input
          type="password"
          placeholder="Confirm Password"
          state={confirmPassword}
          setState={setConfirmPassword}
          required={true}
        />
      </div>
      <Button
        text={isLoading ? "Loading..." : "Signup"}
        onClick={handleSignup}
        disabled={isLoading}
      />
    </>
  );
};

export default SignupForm;
