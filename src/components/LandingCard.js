import React from "react";

const LandingCard = ({ title, Icon, isUp }) => {
  return (
    <div className={`bg-white p-8 rounded-lg w-[300px] ${isUp && "md:-mt-12"}`}>
      <div className="flex items-center flex-col gap-2 justify-center">
        <Icon className="text-6xl text-yellow-600 fill-yellow-600" />
        <h3 className="text-2xl font-semibold text-center text-gray-900">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default LandingCard;
