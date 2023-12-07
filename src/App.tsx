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
import MembersPage from "./pages/Members/MembersPage.tsx";
import PurchasesPage from "./pages/Purchases/PurchasesPage.tsx";
import DocumentsPage from "./pages/Documents/DocumentsPage.tsx";
import CalendarPage from "./pages/Calendar/CalendarPage.tsx";
import Footer from "./components/Layers/Footer/Footer.tsx";
import { useState } from "react";
import AboutPage from "./pages/About/AboutPage.tsx";
import ContactUsPage from "./pages/ContactUs/ContactUsPage.tsx";
import PrivateRoute from "./services/utils/PrivateRoute.tsx";
import NotFoundPage from "./services/utils/NotFoundPage.tsx";
import { NavbarConnected } from "./components/Layers/Navbar/NavbarConnected.tsx";
import { NavbarVisitor } from "./components/Layers/Navbar/NavbarVisitor.tsx";
import { Sidebar } from "./components/Layers/Sidebar/Sidebar.tsx";
import CreateProjectPage from "./pages/CreateProject/CreateProjectPage.tsx";
import ScrollToTop from "./services/utils/ScrollToTop.tsx";
import PublicRoute from "./services/utils/PublicRoute.tsx";
import ContextIsLogged from "./context/ContextIsLogged.tsx";


export default function App() {
  console.log("AppComposant");
  const [logins, setLogin] = useState<Array<string>>([]);
  const token = localStorage.getItem("token");
  const [isLogged, setIsLogged] = useState<boolean>(false)
  token && !isLogged && setIsLogged(true)

  function handleSubmitLogin(login: string) {
    setLogin([...logins, login]);
  }

  const [open, setOpen] = useState(false);

  function toggleSidebar() {
    open ? setOpen(false) : setOpen(true);
  }

  return (
    <ContextIsLogged.Provider value={{isLogged, setIsLogged}}>
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
            <Route
              path="/login"
              element={
                <LoginPage
                  handleSubmitLogin={handleSubmitLogin}
                />
              }
            />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/create-project" element={<CreateProjectPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/project/:idProject" element={<ProjectPage />} />
            <Route
              path="/project/:idProject/documents"
              element={<DocumentsPage />}
            />
            <Route
              path="/project/:idProject/purchases"
              element={<PurchasesPage />}
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
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ScrollToTop>
      <footer>
        <Footer />
      </footer>
      </ContextIsLogged.Provider>
  );
}
