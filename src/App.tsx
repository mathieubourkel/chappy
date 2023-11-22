/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route } from "react-router-dom";
import './css/App.css'
import HomePage from "./pages/Home/HomePage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import SignupPage from "./pages/Signup/SignupPage.tsx";
import ProjectPage from "./pages/Project/ProjectPage.tsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";
import LegalMentionsPage from "./pages/LegalMentions/LegalMentionsPage.tsx";
import UserProfilePage from "./pages/UserProfile/UserProfilePage.tsx";
import StepPage from "./pages/Step/StepPage.tsx";
import TaskPage from "./pages/Task/TaskPage.tsx";
import MembersPage from "./pages/Members/MembersPage.tsx";
import PurchasesPage from "./pages/Purchases/PurchasesPage.tsx";
import DocumentsPage from "./pages/Documents/DocumentsPage.tsx";
import Footer from "./components/Footer/Footer.tsx";
import { useState } from "react";
import AboutPage
    from "./pages/About/AboutPage.tsx";
import ContactUsPage
    from "./pages/ContactUs/ContactUsPage.tsx";


export default function App() {

  const [logins, setLogin] = useState<any>([])
  function handleSubmitLogin(login: string) {
setLogin([...logins, login])
  }

  return (
    <>

        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage handleSubmitLogin={handleSubmitLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard/" element={<DashboardPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/project/documents" element={<DocumentsPage />} />
        <Route path="/project/purchases" element={<PurchasesPage />} />
        <Route path="/project/members" element={<MembersPage />} />
        <Route path="/project/step/" element={<StepPage />} />
        <Route path="/project/step/task/" element={<TaskPage />} />
        <Route path="/legal-mentions" element={<LegalMentionsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/profile/" element={<UserProfilePage />} />
      </Routes>

        <footer>
            <Footer />
        </footer>
    </>
  )
}
