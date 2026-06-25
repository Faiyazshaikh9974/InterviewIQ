import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { BsRobot } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUser, FaUserAstronaut } from "react-icons/fa";
import { useState } from "react";
import axios from "axios"
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [creditDropDown, setCreaditDropDown] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCreditDropDown() {
    setCreaditDropDown(!creditDropDown);
    setUserDropDown(false)
  }



  async function handleLogOut(){
    try {
      const result  = await axios.get(serverUrl + "/api/auth/logout")
      dispatch(setUserData(null))
      console.log(result.data)
      setUserDropDown(false)

    } catch (error) {
      console.log(error)
    }
  }

  const { userData } = useSelector((state) => state.user);
  console.log(userData);
  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl bg-white rounded-[24px] shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative"
      >
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-black text-white p-2 rounded-lg">
            <BsRobot size={18}></BsRobot>
          </div>
          <h1 className="font-semibold text-lg hidden md:block">
            InterviewIQ.AI
          </h1>
        </div>

        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <button
              onClick={handleCreditDropDown}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition"
            >
              <BsCoin size={20} />
              {console.log(userData)}
              {userData?.credits || 0}
            </button>

            {creditDropDown && (
              <div className="absolute right-[-5px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded p-5 z-50 ">
                <p className="text-sm text-gray-600 mb-4">Need more credits to continue interviews?</p>
                <button onClick={()=> navigate("/pricing")} className="w-full bg-black text-white py-2 rounded-lg text-sm">Buy more credits</button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {setUserDropDown(!userDropDown); setCreaditDropDown(false)}}
              className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold"
            >
              {userData?.name ? (
                userData.name.slice(0, 1).toUpperCase()
              ) : (
                <FaUserAstronaut size={16} />
              )}
            </button>

            {userDropDown && <div className="absolute -left-30 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50">
              <p className="text-md text-blue-500 font-medium mb-1">{userData.name}</p>
              <button onClick={()=> navigate("/history")} className="w-full  text-left text-sm py-2 hover:text-black text-gray-600">Interview History</button>
              <button onClick={handleLogOut} className="w-full text-left text-sm py-2 flex items-center  gap-2 text-red-500">
                <HiOutlineLogout size={18}/>Logout</button>
              </div>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Navbar;
