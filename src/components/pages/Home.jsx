import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";

const Home = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const listen = onAuthStateChanged(auth, (user) => {
  //     user ? setAuthUser(user) : setAuthUser(null);
  //     if (!user) return navigate("/");
  //   });
  //   return () => {
  //     listen();
  //   };
  // }, [navigate]);

  // Retrieve user data from Firestore
  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // User is signed in.
          const userRef = query(
            collection(db, "users"),
            where("uid", "==", user?.uid)
          );
          const userSnapshot = await getDocs(userRef);

          if (userSnapshot) {
            const userData = userSnapshot.docs[0].data();
            setAuthUser({ uid: user.uid, ...userData });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error getting document:", error);
        }
      } else {
        // User is signed out.
        setAuthUser(null);
      }
      if (!user) return navigate("/");
    });

    // Clean up when the component unmounts.
    return () => listen();
  }, [navigate]);

  // Sign out user
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div>
        {authUser ? (
          <>
            <div className="">
            <h1 className="text-2xl text-pink-600">Home Page</h1>
              <p className="text-xl mt-4">Welcome, {authUser.name}</p>
              <p className="text-xl mt-4 mb-4">{`Signed In as: ${authUser.email}`}</p>
              <button
                className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={userSignOut}
              >
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <div role="status">
            <svg
              aria-hidden="true"
              className="h-10 w-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          // <p>Signed Out</p>
        )}
      </div>
    </>
  );
};

export default Home;
