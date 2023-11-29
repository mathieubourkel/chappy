import { Routes, Route} from "react-router-dom";
import "./css/App.css";
import HomePage from "./pages/Home/HomePage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import SignupPage from "./pages/Signup/SignupPage.tsx";
import ProjectPage from "./pages/Project/ProjectPage.tsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.tsx";
import LegalMentionsPage from "./pages/LegalMentions/LegalMentionsPage.tsx";
import UserProfilePage from "./pages/UserProfile/UserProfilePage.tsx";
import StepPage from "./pages/Step/StepPage.tsx";
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
import { Sidebar } from "./components/Sidebar/Sidebar.tsx";
import CreateProjectPage from "./pages/CreateProject/CreateProjectPage.tsx";


export default function App() {
  const [logins, setLogin] = useState<Array<string>>([]);
  const isLogged = true;
  const isOwner = true;
  function handleSubmitLogin(login: string) {
    setLogin([...logins, login]);
  }

  const [open, setOpen] = useState(false);
  function toggleSidebar() {
    open ? setOpen(false) : setOpen(true)}

  return (
    <>
      <header>{isLogged ? <><NavbarConnected toggleSidebar={toggleSidebar} /><Sidebar openSidebar={open} toggleSidebar={toggleSidebar} /></> : <NavbarVisitor />}
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LoginPage handleSubmitLogin={handleSubmitLogin} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-project" element={<CreateProjectPage />} />
        <Route element={<PrivateRoute isLogged={isLogged} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/project/:idProject" element={<ProjectPage isOwner={isOwner}/>} />
          <Route path="/project/:idProject/documents" element={<DocumentsPage  isOwner={isOwner}/>} />
          <Route path="/project/:idProject/purchases" element={<PurchasesPage  isOwner={isOwner}/>} />
          <Route path="/project/:idProject/members" element={<MembersPage isOwner={isOwner}/>} />
          <Route path="/project/:idProject/step/:idStep" element={<StepPage isOwner={isOwner} />} />
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
