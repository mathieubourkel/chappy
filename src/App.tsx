/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route } from "react-router-dom";
import "./css/App.css";
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
import AboutPage from "./pages/About/AboutPage.tsx";
import ContactUsPage from "./pages/ContactUs/ContactUsPage.tsx";
import PrivateRoute from "./services/utils/PrivateRoute.tsx";
import NotFoundPage from "./services/utils/NotFoundPage.tsx";
import { NavbarConnected } from "./components/Navbar/NavbarConnected.tsx";
import { NavbarVisitor } from "./components/Navbar/NavbarVisitor.tsx";

export default function App() {
  const [logins, setLogin] = useState<any>([]);
  const isLogged = false;
  function handleSubmitLogin(login: string) {
    setLogin([...logins, login]);
  }

  return (
    <>
      <header>{isLogged ? <NavbarConnected /> : <NavbarVisitor />}</header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage handleSubmitLogin={handleSubmitLogin} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<PrivateRoute isLogged={isLogged} />}>
          <Route path="/dashboard/" element={<DashboardPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/project/documents" element={<DocumentsPage />} />
          <Route path="/project/purchases" element={<PurchasesPage />} />
          <Route path="/project/members" element={<MembersPage />} />
          <Route path="/project/step/" element={<StepPage />} />
          <Route path="/project/step/task/" element={<TaskPage />} />
          <Route path="/profile/" element={<UserProfilePage />} />
        </Route>

        <Route path="/legal-mentions" element={<LegalMentionsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
