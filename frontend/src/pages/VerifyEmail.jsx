import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const isloading = false;
  const location = useLocation();
  const { error, verifyemail, clearError } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyemail(verificationCode);
      navigate("/dashboard");
      toast.success("Email Verified!");
    } catch (error) {
      console.log("There was an Error", error);
    }
  };

  const handleChange = (index, value) => {
    const newCode = [...code];
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  useEffect(() => {
    clearError();
  }, [location.pathname]);

  return (
    <>
      <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
        >
          <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-pink-400 to-orange-500  text-transparent bg-clip-text">
            Verify your Email
          </h2>
          <p className="text-center text-gray-300 mb-6">
            Enter the 6-digit code sent to your email address
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(e) => (inputRefs.current[index] = e)}
                  type="text"
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-400 rounded-lg focus:border-pink-500 focus:outline-none"
                />
              ))}
            </div>
            {error && (
              <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isloading || code.some((digit) => !digit)}
              className="mt-5 w-full py-3 px-4 bg-linear-to-r from-pink-500 to-pink-700 text-white font-bold rounded-lg shadow-lg hover:from-pink-500 hover:to-orange-500 hover:shadow-xl hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50 "
            >
              {isloading ? "Verifying..." : "Verify Email"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default VerifyEmail;
