import {
  BrowserRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import Navbar
  from "../components/layout/Navbar";

import AppRoutes
  from "./routes";

function AppContent() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  useEffect(() => {

    // prevent redirect loop
    const allowedPaths = [

      "/onboarding",
    ];

    if (
      !allowedPaths.includes(
        location.pathname
      )
    ) {

      navigate(
        "/onboarding"
      );
    }

  }, []);

  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

function App() {

  return (
    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  );
}

export default App;