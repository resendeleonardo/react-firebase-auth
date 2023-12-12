import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerUser } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const AuthRegister = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  
  const registerNewUser = () => {
    if (!fullName) alert("Please enter your full name.");
    registerUser(fullName, email, password);
  };

  useEffect(() => {
    if (loading) {
      // Do something...
      return;
    }
    if (user) navigate("/home");
  }, [user, loading]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center sm:items-center">
        <div className="border rounded-lg px-4 py-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
              <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
                Create now a new account
              </h2>
          </div>

          <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              {/* Full Name - Register Only */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="flex justify-start block text-sm font-medium leading-6 text-white-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="current-fullName"
                      required
                      className="block w-full rounded-md border-0 px-2.5 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
                      maxLength={30}
                    />
                  </div>
                </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="flex justify-start block text-sm font-medium leading-6 text-white-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                    maxLength={30}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    {/* empty div */}
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 px-2.5 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
              </div>

              {/* Submit -- Login | Register */}
              <div>
                  <button
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={registerNewUser}
                  >
                    Sign up
                  </button>
              </div>
            </div>

              <p className="mt-10 text-center text-sm text-white-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Sign in here
                </Link>
              </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthRegister;
