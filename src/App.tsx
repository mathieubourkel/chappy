/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import SignupPage from "./pages/Signup/SignupPage.tsx";
import ProjectPage from "./pages/Project/ProjectPage.tsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";
import LegalMentionsPage from "./pages/LegalMentions/LegalMentionsPage.tsx";
import UserProfilePage from "./pages/UserProfile/UserProfilePage.tsx";
import StepPage from "./pages/Step/StepPage.tsx";
import MembersPage from "./pages/Members/MembersPage.tsx";
import CalendarPage from "./pages/Calendar/CalendarPage.tsx";
import Footer from "./components/layers/Footer/Footer.tsx";
import { useState } from "react";
import AboutPage from "./pages/About/AboutPage.tsx";
import ContactUsPage from "./pages/ContactUs/ContactUsPage.tsx";
import PrivateRoute from "./services/utils/PrivateRoute.tsx";
import NotFoundPage from "./services/utils/NotFoundPage.tsx";
import { NavbarConnected } from "./components/layers/Navbar/NavbarConnected.tsx";
import { NavbarVisitor } from "./components/layers/Navbar/NavbarVisitor.tsx";
import CreateProjectPage from "./pages/CreateProject/CreateProjectPage.tsx";
import ScrollToTop from "./services/utils/ScrollToTop.tsx";
import PublicRoute from "./services/utils/PublicRoute.tsx";
import ContextIsLogged from "./context/ContextIsLogged.tsx";
import Sidebar from "./components/layers/Sidebar/Sidebar.tsx";
import ForgotPwd from "./pages/Password/ForgotPwd.tsx";
import ResetPwd from "./pages/Password/ResetPwd.tsx";
import DocumentPage from "./pages/Document/DocumentPage.tsx";
import ComptaPage from "./pages/Compta/ComptaPage.tsx";


export default function App() {

  const token = localStorage.getItem("token");
  const [isLogged, setIsLogged] = useState<boolean>(!!token);
  token && !isLogged && setIsLogged(true);
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen(!open)

  return (
    <ContextIsLogged.Provider value={{ isLogged, setIsLogged }}>
      <header>
        {isLogged ? (
          <>
            <NavbarConnected toggleSidebar={toggleSidebar} />
            <Sidebar openSidebar={open} toggleSidebar={toggleSidebar} />
          </>
        ) : (
          <NavbarVisitor />
        )}
      </header>
      
      <ScrollToTop>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create-project" element={<CreateProjectPage />} />

            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/project/:idProject" element={<ProjectPage />} />
            <Route
              path="/project/:idProject/documents"
              element={<DocumentPage />}
            />
            <Route
              path="/project/:idProject/comptas"
              element={<ComptaPage />}
            />
            <Route
              path="/project/:idProject/members"
              element={<MembersPage />}
            />
            <Route
              path="/project/:idProject/step/:idStep"
              element={<StepPage />}
            />
            <Route path="/profile/" element={<UserProfilePage />} />
          </Route>

          <Route path="/legal-mentions" element={<LegalMentionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reset-pwd" element={<ResetPwd />} />
          <Route path="/forgot-pwd/:emailToken" element={<ForgotPwd />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ScrollToTop>
      <Footer />
    </ContextIsLogged.Provider>
  );
}
