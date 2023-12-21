import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/features/userSlice";
import { LOGIN_BACKGROUND_IMG, USER_AVATAR_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);


  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(
      email?.current?.value,
      password?.current?.value
    );
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR_URL,
          })
            .then(() => {
              // Profile updated!

              const { uid, email, displayName, photoURL } = auth.currentUser;
              console.log(`Name : ${displayName}`)
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );

            })
            .catch((error) => {
              // An error occurred
              console.log(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use")
            setErrorMessage(`Email Id already registered.`);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/invalid-credential")
            setErrorMessage(`Incorrect User Credentials`);
        });
    }
  };

  return (
    <>
      <Header />
      <div>
        <img
          className="brightness-50 absolute"
          src={LOGIN_BACKGROUND_IMG}
          alt="background image"
        ></img>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute mx-auto w-3/12 left-0 right-0 bg-black flex flex-col mt-32 text-white p-10   rounded-lg bg-opacity-75"
      >
        {isSignInForm ? (
          <h2 className="mb-[28px] text-[32px] font-[500]">Sign In</h2>
        ) : (
          <h2 className="mb-[28px] text-[32px] font-[500]">Sign Up</h2>
        )}

        {!isSignInForm && (
          <input
            className="text-lg bg-[#333333] py-3 px-4 mb-6 rounded-lg placeholder-[#8C8C8C] "
            type="text"
            ref={name}
            placeholder="Full Name"
          ></input>
        )}

        <input
          className="text-lg bg-[#333333] py-3 px-4 mb-6 rounded-lg placeholder-[#8C8C8C] "
          type="text"
          ref={email}
          placeholder="Email"
        ></input>
        <input
          className="text-lg bg-[#333333] py-3 px-4 rounded-lg mb-6 placeholder-[#8C8C8C]"
          type="password"
          ref={password}
          placeholder="Password"
        ></input>

        <p className="text-[#E87603] pl-2 text-sm">{errorMessage}</p>

        <button
          onClick={handleButtonClick}
          className="bg-[#E50914] py-3 rounded-lg text-lg mt-4"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {isSignInForm ? (
          <p className="mt-4">
            <span className="text-[#737373]">New to Netflix?</span>{" "}
            <span className="cursor-pointer" onClick={toggleSignInForm}>
              Sign Up now
            </span>
            <span className="text-[#737373]">.</span>
          </p>
        ) : (
          <p className="mt-4">
            <span className="text-[#737373]">Already Registered?</span>{" "}
            <span className="cursor-pointer" onClick={toggleSignInForm}>
              Sign In now
            </span>
            <span className="text-[#737373]">.</span>
          </p>
        )}
      </form>
    </>
  );
};

export default Login;
