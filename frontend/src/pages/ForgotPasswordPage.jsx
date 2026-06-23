import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { forgotSchema } from "../schema/Index";

const ForgotPasswordPage = () => {
  const [isSubmitted, setisSubmitted] = useState(false);
  const { isLoading, forgotpassword, error, message } = useAuthStore();
  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values) => {
    await forgotpassword(values.email);
    setisSubmitted(true);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={forgotSchema}
        onSubmit={handleSubmit}
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
              <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                Forgot Password
              </h2>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <p className="text-gray-300 mb-6 text-center">
                    Enter your email and We'll send you a link to reset your
                    password.
                  </p>
                  <div className="mb-6">
                    <Input
                      icon={Mail}
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={values.email}
                      title="Email Address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      onKeyDown={(e) => {
                        if (e.code === "Space") {
                          e.preventDefault();
                        }
                      }}
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  {error && (
                    <p className="text-red-500 font-semibold mb-2">{error}</p>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-linear-to-r from-pink-500 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:from-pink-500 hover:to-orange-500 hover:shadow-xl hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus: ring-offset-gray-900 transition duration-200 "
                    type="submit"
                  >
                    {isLoading ? (
                      <Loader className="size-6 animate-spin mx-auto" />
                    ) : (
                      "Send Reset Link"
                    )}
                  </motion.button>
                </form>
              ) : (
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 "
                  >
                    <Mail className="h-8 w-8 text-white" />
                  </motion.div>
                  <p className="text-gray-300 mb-6">
                    If an account exists for {values.email}, you will recieve an
                    email to reset your password shortly.
                  </p>
                </div>
              )}
            </div>
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
              <Link
                to={"/"}
                className="text-sm text-pink-500 hover:text-pink-400 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
              </Link>
            </div>
          </motion.div>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordPage;
