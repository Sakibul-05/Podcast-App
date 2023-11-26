import React, { useState } from "react";
import SignupForm from "../components/SignUp-LogIn_Comonents/SignupForm/SignupForm";
import LoginForm from "../components/SignUp-LogIn_Comonents/LoginForm/LoginForm";

const SignUpPage = () => {
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex-input-wrapper">
      <div className="input-wrapper">
        {/* If flag=true  then <h1>Signup</h1> show else <h1>Login</h1> */}
        {/* {!flag ? <h1>Signup</h1> : <h1>Login</h1>} */}
        <h1>{!flag ? "Signup" : "Login"}</h1>
        {/* If flag=true then show SginupForm component otherwise show LoginForm component */}
        {!flag ? (
          <SignupForm isLoading={isLoading} setIsLoading={setIsLoading} />
        ) : (
          <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
        )}
        {!flag ? (
          <p style={{ marginTop: "1rem" }}>
            Already have an Account? click here to{" "}
            <span className="link" onClick={() => setFlag(!flag)}>
              login
            </span>
            .
          </p>
        ) : (
          <p style={{ marginTop: "1rem" }}>
            Don't have an account? click here to{" "}
            <span className="link" onClick={() => setFlag(!flag)}>
              signup
            </span>
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
