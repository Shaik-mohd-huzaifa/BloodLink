import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/LandingPage";
import routes from "tempo-routes";

// Lazy load pages
const LoginPage = lazy(() => import("./components/auth/LoginPage"));
const SignupPage = lazy(() => import("./components/auth/SignupPage"));
const ProfilePage = lazy(() => import("./components/dashboard/ProfilePage"));
const RequestBloodForm = lazy(
  () => import("./components/dashboard/RequestBloodForm"),
);
const DonateBloodForm = lazy(
  () => import("./components/dashboard/DonateBloodForm"),
);

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/request-blood" element={<RequestBloodForm />} />
          <Route path="/donate-blood" element={<DonateBloodForm />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
