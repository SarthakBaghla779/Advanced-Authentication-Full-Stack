import { Check, X } from "lucide-react";
import React from "react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 Characters", met: password.length >= 6 },
    { label: "Contians Uppercase Characters", met: /[A-Z]/.test(password) },
    { label: "Contains Lowercase Characters", met: /[a-z]/.test(password) },
    { label: "Contains a Numeric Value", met: /\d/.test(password) },
    {
      label: "Contains a Special Character",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];
  return (
    <>
      <div className="mt-2 space-y-1">
        {criteria.map((item) => (
          <div key={item.label} className="flex items-center text-xs">
            {item.met ? (
              <Check className="size-4 text-green-400 mr-2" />
            ) : (
              <X className="size-4 text-red-500" />
            )}
            <span className={item.met ? "text-green-400" : "text-gray-500"}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  };
  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-300";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-green-300";
    return "bg-green-500";
  };

  const getStrengthTest = (strength) => {
    if (strength === 0) return "Poor";
    if (strength === 1) return "Fair";
    if (strength === 2) return "Acceptable";
    if (strength === 3) return "Great";
    return "Strong";
  };
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400">Password Strength</span>
        <span className="text-xs text-gray-400">
          {getStrengthTest(strength)}
        </span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? getColor(strength) : "bg-gray-700"}`}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
