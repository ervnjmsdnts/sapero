import React from "react";
import { AiFillLinkedin, AiFillGithub, AiFillFacebook } from "react-icons/ai";

const Portfolio = ({
  isRight,
  image,
  firstName,
  lastName,
  urls,
  description,
  portfolioLink,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-8 ${
        isRight ? "flex-col md:flex-row-reverse" : ""
      }`}>
      <img
        src={image}
        alt="profile"
        className="h-48 w-48 rounded-full border-yellow-600 border-2"
      />
      <div
        className={`flex flex-col gap-4 text-center md:text-left ${
          isRight ? "text-center md:text-right" : ""
        }`}>
        <h3 className="text-2xl font-semibold">
          <span>{firstName}</span>{" "}
          <span className="text-yellow-600">{lastName}</span>
        </h3>
        <p className="w-[400px] md:w-[500px] text-gray-400 text-center md:text-justify">
          {description}
        </p>
        <div
          className={`flex flex-col md:flex-row gap-8 items-center ${
            isRight ? "md:self-end" : ""
          }`}>
          <a
            href={portfolioLink}
            target="_blank"
            rel="noreferrer"
            className="bg-yellow-600 cursor-pointer text-gray-900 py-2 px-6 rounded-lg font-semibold hover:bg-yellow-500">
            See my Portfolio
          </a>
          <div className="flex gap-2 items-center">
            {urls.map((url) => (
              <a href={url} target="_blank" rel="noreferrer">
                {url.includes("linkedin") ? (
                  <AiFillLinkedin className="text-3xl" />
                ) : url.includes("github") ? (
                  <AiFillGithub className="text-3xl" />
                ) : (
                  <AiFillFacebook className="text-3xl" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
