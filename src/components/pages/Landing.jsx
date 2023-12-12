import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLogin from "../accounts/AuthLogin";

const Landing = () => {
  const [isLogin, setIsLogin] = useState();

  return (
    <>
      {!isLogin ? (
        <div className="flex flex-col justify-between items-center p-6 sm:px-20">
          <h1 className="text-2xl text-pink-600">Landing Page</h1>
          <div className="flex flex-row justify-center mt-4">
            <p className="mt-2 font-semibold leading-6 text-white-600">
              <span
                className="mt-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                Sign in
              </span>{" "}
              or{" "}
              <Link
                to="/register"
                className="mt-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                create account
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <AuthLogin />
      )}
    </>
  );
};

export default Landing;
