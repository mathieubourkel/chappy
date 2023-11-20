import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Project from "./pages/Project/Project";
import Dashboard from "./pages/Dashboard/Dashboard";
import LegalMentions from "./pages/LegalMentions/LegalMentions";
import Step from "./pages/Step/Step";
import Task from "./pages/Task/Task";
import UserProfile from "./pages/UserProfile/UserProfile";
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<Project />} />
        <Route path="/step" element={<Step />} />
        <Route path="/task" element={<Task />} />
        <Route path="/legal-mentions" element={<LegalMentions />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  )
}

export default App
