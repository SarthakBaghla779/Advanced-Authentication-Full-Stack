import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import { loginSchema } from "../schema/Index";
import { Formik } from "formik";

const LoginPage = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch (error) {
      console.log("There was an Error", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
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
            <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-pink-400 to-orange-500 text-transparent bg-clip-text">
              Login
            </h2>
            <form onSubmit={handleSubmit}>
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
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-6">
                <Input
                  icon={Lock}
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={values.password}
                  title="Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                    if (e.code === "Space") {
                      e.preventDefault();
                    }
                  }}
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div className="flex justify-between mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm text-pink-400 hover:text-pink-500"
                >
                  Forgot Password?
                </Link>
              </div>
              {error && (
                <p className="text-red-500 font-semibold mb-2">{error}</p>
              )}
              <motion.button
                className="mt-5 w-full py-3 px-4 bg-linear-to-r from-pink-500 to-pink-700 text-white font-bold rounded-lg shadow-lg hover:from-pink-500 hover:to-orange-500 hover:shadow-xl hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-gray-900 transition duration-200"
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="h-6 w-6 mx-auto animate-spin" />
                ) : (
                  "Login"
                )}
              </motion.button>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
            <p className="text-sm text-gray-400">
              First time Visiting Us?
              <Link
                to={"/signup"}
                className="text-pink-400  ml-2  hover:text-pink-500"
              >
                SignUp
              </Link>
            </p>
          </div>
        </motion.div>
      )}
    </Formik>
  );
};

export default LoginPage;
