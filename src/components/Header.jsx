import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/features/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {LOGO} from '../utils/constants'
const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Unsubsribing from the event listner when the component unmount --> Optimisation
    return ()=> unsubscribe()
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  };
  return (
    <>
      <div className="flex absolute z-10  justify-between w-full">
        <img
          className="w-44 ml-4 mt-2"
          src={LOGO}
        ></img>

        {user && (
          <div className="flex p-2">
            <img
              className="w-10 h-10 m-4 rounded-lg"
              src={user?.photoURL}
              alt=""
            ></img>
            <button
              onClick={handleSignOut}
              className="bg-slate-700 px-4 py-2 m-4 text-white rounded-lg"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
