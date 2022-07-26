import React from "react";
import { NavLink } from "react-router-dom";
import { useProfile } from "../api/profile";
import {
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import Wave from "../assets/images/wavesOpacity.svg";

const navItems = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Models",
    to: "/models",
  },
  {
    name: "My Cars",
    to: "/my-cars",
  },
  {
    name: "Contact",
    to: "/contact",
  },
];

const Footer = () => {
  const { data: profile } = useProfile();

  const filteredNavItems = navItems.filter((item) =>
    profile ? item : item?.name !== "My Cars"
  );
  return (
    <>
      <img src={Wave} alt="wave" className="rotate-180" />
      <div className="bg-yellow-600 text-gray-900 p-16">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className="font-semibold hover:text-white">
                {item.name}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <AiOutlineTwitter className="text-4xl hover:text-white cursor-pointer" />
            <AiFillFacebook className="text-4xl hover:text-white cursor-pointer" />
            <AiFillInstagram className="text-4xl hover:text-white cursor-pointer" />
          </div>
          <p>Copyright © 2022 - All right reserved by Sapero Ltd</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
