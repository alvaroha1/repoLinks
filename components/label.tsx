import React from "react";

interface LabelProps {
  htmlFor: string;
  text: string;
}

export default function Label({ htmlFor, text }: LabelProps) {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {text}
      </label>
    </>
  );
}
