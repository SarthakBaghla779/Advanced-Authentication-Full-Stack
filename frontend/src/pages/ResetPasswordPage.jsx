import React, { use, useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { Formik } from "formik";
import { resetSchema } from "../schema/Index";
import { useEffect } from "react";

const ResetPasswordPage = () => {
  // const [password, setPassword] = useState("");
  // const [confirm, setConfirm] = useState("");
  const { resetpassword, error, message, isLoading, clearError } =
    useAuthStore();
  const initialValues = {
    password: "",
    confirm: "",
  };
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (values) => {
    try {
      await resetpassword(token, values.password);
      toast.success(
        "Password Reset Successfully! Redirecting to Login Page...",
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error Resetting Password!");
    }
  };

  useEffect(() => {
    clearError();
  }, [location.pathname]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={resetSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text ">
                Reset Password
              </h2>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              {message && (
                <p className="text-green-500 text-sm mb-4">{message}</p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <Input
                    icon={Lock}
                    name="password"
                    type="password"
                    placeholder="New Password"
                    value={values.password}
                    title="New Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                      if (e.code === "Space") {
                        e.preventDefault();
                      }
                    }}
                  />
                  {touched.password && errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="mb-6">
                  <Input
                    icon={Lock}
                    name="confirm"
                    type="password"
                    placeholder="Confirm Password"
                    value={values.confirm}
                    title="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                      if (e.code === "Space") {
                        e.preventDefault();
                      }
                    }}
                  />
                  {touched.confirm && errors.confirm && (
                    <p className="text-red-500 text-sm">{errors.confirm}</p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-4 bg-linear-to-r from-pink-500 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:from-pink-500 hover:to-orange-500 hover:shadow-xl hover:cursor-pointer focus-outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordPage;
