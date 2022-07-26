import React from "react";
import { Link } from "react-router-dom";

const ModelCard = ({
  name,
  image,
  description,
  type,
  rate,
  _id,
  isUse,
  isLanding,
}) => {
  return (
    <div className="py-8 rounded-lg bg-white text-gray-900 px-16">
      <div
        className={`flex flex-col gap-4 justify-center items-center ${
          isLanding ? "flex-col-reverse" : ""
        }`}>
        <h3 className="font-semibold text-xl text-center">{name}</h3>
        <img src={image} alt="car" className="w-64 h-40" />
        {!isLanding && (
          <>
            <div className="flex items-center justify-between w-full">
              <h4 className="text-lg font-medium">{type}</h4>
              <p className="bg-green-600 text-white text-sm py-1 px-2 font-semibold rounded-full">
                Php {rate.toLocaleString("en-US")}.00/day
              </p>
            </div>
            <div className="w-full h-px bg-gray-200" />
            <div className="flex justify-center text-center">
              <p className="w-64 h-24">{description}</p>
            </div>
          </>
        )}
        <div className="flex w-full flex-col gap-2 text-white">
          {!isUse && (
            <>
              <Link to={`/rent/${_id}`}>
                <button className="py-1 w-full px-4 rounded-full bg-yellow-600 hover:bg-yellow-500">
                  Rent
                </button>
              </Link>
              <Link to={`/reserve/${_id}`}>
                <button className="py-1 w-full px-4 rounded-full bg-yellow-600 hover:bg-yellow-500">
                  Reserve
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
