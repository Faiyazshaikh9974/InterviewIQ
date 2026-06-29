import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import InterviewPage from "./pages/InterviewPage";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice";

function App() {
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const serverUrl = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    try {
      let getCurrentUser = async () => {
        const currentUser = await axios.get(
          serverUrl + "/api/user/current-user",
          {
            withCredentials: true,
          },
        );

        dispatch(setUserData(currentUser.data));
        if(currentUser){
          navigate("/")
        }
      };

      getCurrentUser();
    } catch (error) {
      console.log(error);
      dispatch(setUserData(null));
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/interview" element={<InterviewPage />} />
    </Routes>
  );
}

export default App;
