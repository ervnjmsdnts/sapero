import React, { forwardRef } from "react";

const TextArea = forwardRef(({ label, className, errors, ...props }, ref) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && <label className="font-semibold">{label}</label>}
      <textarea
        ref={ref}
        className={`rounded-lg resize-none focus:outline-yellow-600 py-2 px-4 text-black placeholder:font-semibold placeholder:text-gray-500 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-75 disabled:placeholder:text-gray-700 ${className}`}
        {...props}></textarea>
      {errors && <p className="text-red-600 text-sm">{errors.message}</p>}
    </div>
  );
});
export default TextArea;
