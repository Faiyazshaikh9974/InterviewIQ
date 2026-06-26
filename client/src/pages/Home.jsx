import { useSelector } from "react-redux";
import Navbar from "../components/Navbar.jsx";
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import AuthModel from "../components/AuthModel.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../assets/confi.png";
import credit from "../assets/credit.png";
import history from "../assets/history.png";
import HR from "../assets/HR.png";
import img1 from "../assets/img1.png";
import MM from "../assets/MM.png";
import pdf from "../assets/pdf.png";
import resume from "../assets/resume.png";
import tech from "../assets/tech.png";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setshowAuth] = useState(false);
  const navigate = useNavigate();

  const CardsData = [
    {
      icon: <BsRobot size={24} />,
      step: "STEP-1",
      title: "Role & Experince Selection",
      desc: "AI adjusts difficulty based on the selected job role.",
    },
    {
      icon: <BsMic size={24} />,
      step: "STEP-2",
      title: "Smart Voice Interview",
      desc: "Dynamic follow-up questions based on your answers.",
    },
    {
      icon: <BsClock size={24} />,
      step: "STEP-3",
      title: "Timer Based Simulation.",
      desc: "Real Interview pressure with time tracking.",
    },
  ];

  const ImageCardData = [
    {
      image: config,
      icon: <BsBarChart size={20} />,
      title: "AI Anser Evalution",
      desc: "Souce Communication, technical accuracy and confidence.",
    },
    {
      image: resume,
      icon: <BsFileEarmarkText size={20} />,
      title: "Resume Based Interview",
      desc: "Project-Specific questions based on uploaded resume.",
    },
    {
      image: pdf,
      icon: <BsFileEarmarkText size={20} />,
      title: "Downloadable PDF Report",
      desc: "Detailed strenghts, weaknesses and improvement insights.",
    },
    {
      image: history,
      icon: <BsBarChart size={20} />,
      title: "History & Analytics",
      desc: "Track progress with performance graphs and topic analysis.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />

      <div className="flex-1 px-6 py-20">
        <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2">
            <HiSparkles size={16} className="bg-green-50 text-green-600 " /> AI
            Powered Smart Interview Platform
          </div>
        </div>
        <div className="text-center mb-28">
          <motion.h1 className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto ">
            Pratice Interview with
            <span className="relative inline-block">
              <span className="bg-green-100 text-green-600 px-5 py-1 rounded-full">
                AI Intelligence
              </span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg"
          >
            Role-based mock interviews with smart fllow-ups, adaptive difficulty
            and real-time performance evaluation.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <motion.button
              onClick={() => {
                if (!userData) {
                  setshowAuth(true);
                  return;
                }
                navigate("/interview");
              }}
              whileHover={{ opacity: 0.9, scale: 1.03 }}
              whileTap={{ opacity: 1, scale: 0.8 }}
              className="bg-black text-white px-10 py-3 rounded-full hover:opacity-90 transition shadow-md"
            >
              Start Interview
            </motion.button>
            <motion.button
              onClick={() => {
                if (!userData) {
                  setshowAuth(true);
                  return;
                }
                navigate("/history");
              }}
              whileHover={{ opacity: 0.9, scale: 1.03 }}
              whileTap={{ opacity: 1, scale: 0.8 }}
              className="border border-gray-300 px-10 py-3 rounded-full hover:bg-gray-100 transition "
            >
              View History
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-28">
          {CardsData.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 + index * 0.2 }}
                whileHover={{ rotate: 0, scale: 1.06 }}
                key={index}
                className={`
              relative bg-white rounded-3xl border-2 border-green-100 hover:border-green-500 p-10 w-80 
              max-w-[90%] shadow-md hover:shadow-2xl transition-all duration-300
              ${index === 0 ? "rotate-[-4deg]" : ""}
              ${index === 1 ? "rotate-[3deg] mb:mt-6 shadow-xl" : ""}
              ${index === 2 ? "rotate-[-3deg]" : ""}
            `}
              >
                <div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-green-500 text-green-600 w-16 h-16
              rounded-2xl flex items-center justify-center shadow-lg
              
              "
                >
                  {item.icon}
                </div>
                <div className="pt-10 text-center ">
                  <div className="text-xs text-green-600 font-semibold mb-2 tracking-winder">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-3 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mb-32">
          <motion.h2
            className="text-4xl font-semibold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {" "}
            Advanced AI <span className="text-green-600 ">Capabilities</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-10">
            {ImageCardData.map((item, index) => (
              <motion.div
                className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow:xl transition-all"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row itmes-center gap-8">
                  <div className="w-full md:w-1/2 flex justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-contain max-h-64"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="bg-green-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold mb-3 text-xl">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-32">
          <motion.h2
            className="text-4xl font-semibold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {" "}
            Multiple Interview<span className="text-green-600 ">Modes</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-10">
            {ImageCardData.map((item, index) => (
              <motion.div
                className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow:xl transition-all"
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row itmes-center gap-8">
                  <div className="w-full md:w-1/2 flex justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-contain max-h-64"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="bg-green-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold mb-3 text-xl">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {showAuth && <AuthModel onClose={() => setshowAuth(false)} />}
    </div>
    </div>
  );
}

export default Home;
