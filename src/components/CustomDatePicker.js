import { forwardRef } from "react";

const CustomDatePicker = forwardRef(({ value, onClick }, ref) => {
  return (
    <button
      type="button"
      ref={ref}
      onClick={onClick}
      className="bg-white py-2 px-4 rounded-lg w-full">
      {value}
    </button>
  );
});

export default CustomDatePicker;
