import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"
import { useEffect } from "react"
import axios from "axios"

function App() {

  const serverUrl = "http://localhost:5000"
  useEffect(()=>{

    try {
      let getCurrentUser = async()=>{
      const currentUser = await axios.get(serverUrl + "/api/user/current-user", {
        withCredentials: true
      })

      console.log(currentUser)
    }

    getCurrentUser()
    } catch (error) {
      console.log(error)
    }
    

  }, [])
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/auth" element={<Auth/>}/>
    </Routes>
  )
}

export default App