import React from "react";

export default function CustomButton({ className, text, ...props }) {
  return (
    <button
      className={`${className} rounded-xl bg-[#5A72A0] hover:bg-[#5885d8] font-semibold text-white`}
      {...props}
    >
      {text}
    </button>
  );
}
