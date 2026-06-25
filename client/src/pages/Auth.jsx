import { RiRobot2Fill } from "react-icons/ri";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

export default function Auth({ isModel = false }) {
  const dispatch = useDispatch();
  let serverUrl = "http://localhost:5000";
  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let User = response.user;
      let email = User.email;
      let name = User.displayName;

      const dbUser = await axios.post(
        serverUrl + "/api/auth/google",
        {
          email,
          name,
        },
        { withCredentials: true },
      );

      dispatch(setUserData(dbUser.data));
    } catch (error) {
      console.log(error);
      dispatch(setUserData(null));
    }
  };
  return (
    <div className={`w-full ${isModel ? "py-4": "w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20 " } `}>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className={`w-full ${isModel? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"} bg-white shadow-2xl border border-gray-200`}  
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-lg">
            <RiRobot2Fill size={18} />
          </div>
          <h2 className="font-semibold text-lg">InterviewIQ.AI</h2>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4">
          Continue with{" "}
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2">
            <IoSparkles size={16} /> AI Smart Interview
          </span>
        </h1>

        <p className="text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8">
          Sign in to start AI-Powered mock interview, track your progress and
          unlock detailed performance insights.
        </p>

        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ opacity: 0.9, scale: 1.03 }}
          whileTap={{ opacity: 1, scale: 0.8 }}
          className="w-full flex items-center justify-center text-white bg-black gap-3 py-3 rounded-full shadow-md"
        >
          <FcGoogle size={20}></FcGoogle>
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
}
