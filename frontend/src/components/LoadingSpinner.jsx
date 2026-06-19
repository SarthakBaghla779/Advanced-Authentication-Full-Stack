import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-linear-to-r from-gray-900 via-pink-700 to-orange-700 flex items-center justify-center relative overflow-hidden ">
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-t-pink-400 border-pink-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
