import FloatingShape from "./components/FloatingShape";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import DashboardPage from "./pages/DashboardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verifyemail" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkauth } = useAuthStore();

  useEffect(() => {
    checkauth();
  }, [checkauth]);

  if (isCheckingAuth) return <LoadingSpinner />;
  // console.log("Is Authenticated: ", isAuthenticated);
  // console.log("User: ", user);
  return (
    <>
      <div className="min-h-screen bg-linear-to-bl from-orange-500 via-pink-500 to-pink-900 flex items-center justify-center relative overflow-hidden">
        <FloatingShape
          color="bg-pink-100"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-pink-100"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-pink-100"
          size="w-32 h-32"
          top="40%"
          left="-50%"
          delay={2}
        />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Signup"
            element={
              <RedirectAuthenticatedUser>
                <SignupPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verifyemail" element={<VerifyEmail />} />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="*"
            element={
              <RedirectAuthenticatedUser>
                <Navigate to="/" replace />;
              </RedirectAuthenticatedUser>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
