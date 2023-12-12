import React from "react";
import AuthForm from "../accounts/AuthForm";

const Auth = () => {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <AuthForm />
      </div>
    </>
  );
};

export default Auth;
