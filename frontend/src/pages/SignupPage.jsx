import React from "react";
import { Formik } from "formik";
import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from "lucide-react";
import Input from "../components/input";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import { useAuthStore } from "../store/authStore.js";
import { signupSchema } from "../schema/index.jsx";

const SignupPage = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const intialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      await signup(values.email, values.password, values.name);
      navigate("/verifyemail");
    } catch (error) {
      console.log("There was an Error", error);
    }
  };

  return (
    <Formik
      initialValues={intialValues}
      validationSchema={signupSchema}
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
            <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-pink-400 to-orange-500  text-transparent bg-clip-text">
              Create Account
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Input
                  icon={User}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={values.name}
                  title="Full Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                    if (e.code === "Space" && !e.currentTarget.value) {
                      e.preventDefault();
                    }
                  }}
                />
                {touched.name && errors.name && (
                  <p className="text-red-500 text-sm mb-1 ml-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <Input
                  icon={Mail}
                  type="email"
                  name="email"
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
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  title="password"
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

              {error && (
                <p className="text-red-500 font-semibold mt-2 ">{error}</p>
              )}
              <PasswordStrengthMeter password={values.password} />
              <motion.button
                className="mt-5 w-full py-3 px-4 bg-linear-to-r from-pink-500 to-pink-700 text-white font-bold rounded-lg shadow-lg hover:from-pink-500 hover:to-orange-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 "
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin mx-auto" size={24} />
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
            <p className="text-sm text-gray-400">
              Already have an Account?
              <Link
                to={"/"}
                className="text-pink-400  ml-2  hover:text-pink-500"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      )}
    </Formik>
  );
};

export default SignupPage;
