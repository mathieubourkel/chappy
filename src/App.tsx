import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Project from "./pages/Project/Project";
import Dashboard from "./pages/Dashboard/Dashboard";
import LegalMentions from "./pages/LegalMentions/LegalMentions";
import UserProfile from "./pages/UserProfile/UserProfile";
import Navbar from "./components/Navbar";
import Step from "./pages/Project/Step/Step";
import Task from "./pages/Project/Step/Task/Task";
import Members from "./pages/Project/Members/Members";
import Purchases from "./pages/Project/Purchases/Purchases";
import Documents from "./pages/Project/Documents/Documents";

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
        <Route path="/project/documents" element={<Documents />} />
        <Route path="/project/purchases" element={<Purchases />} />
        <Route path="/project/members" element={<Members />} />
        <Route path="/project/step" element={<Step />} />
        <Route path="/project/step/task" element={<Task />} />
        <Route path="/legal-mentions" element={<LegalMentions />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  )
}

export default App
