import React from "react";

const Testimonial = ({ name, title, company, quote, image }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center bg-white p-8 rounded-lg">
      <div className="flex flex-col gap-2 justify-center">
        <img
          src={image}
          alt={name}
          className="rounded-full w-32 h-32"
          style={{ objectFit: "cover" }}
        />
        <div className="">
          <h3 className="text-2xl font-semibold text-center text-gray-900">
            {name}
          </h3>
          <h4 className="text-lg font-semibold text-center text-gray-400">
            {title}
          </h4>
        </div>
      </div>
      <p className="text-xl font-light md:w-[500px] h-[150px] text-center text-gray-900">
        {quote}
      </p>
    </div>
  );
};

export default Testimonial;
