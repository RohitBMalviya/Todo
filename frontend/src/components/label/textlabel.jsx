import React from "react";

export default function TextLabel({ className, htmlFor, text }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`${className} sm:text-3xl text-2xl font-medium`}
    >
      {text}
    </label>
  );
}
