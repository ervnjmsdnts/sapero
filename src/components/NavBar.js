import React, { useCallback, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { AiFillCaretDown } from "react-icons/ai";

import Logo from "../assets/images/logo_sapero.png";
import { Menu, Transition } from "@headlessui/react";
import { useProfile } from "../api/profile";
import { useAuth } from "../context/authContext";
import AddBalanceModal from "./AddBalanceModal";

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

const MobileNavBar = ({ filteredNavItems, onSignOut, role, openModal }) => {
  const { data: profile } = useProfile();
  return (
    <div className="flex items-center md:hidden justify-between mx-6 mt-2">
      <Menu className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <IoReorderThreeOutline className="text-5xl" />
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="absolute text-black left-0 z-10 font-semibold w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-1">
                {filteredNavItems.map((item) => (
                  <Menu.Item key={item.name}>
                    <NavLink
                      to={item.to}
                      className="group flex w-full items-center rounded-md text-sm px-2 py-2 hover:bg-gray-200">
                      {item.name}
                    </NavLink>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
      {profile ? (
        <Menu className="relative inline-block text-left">
          <div>
            <Menu.Button className="text-yellow-600 font-bold flex items-center gap-1">
              {`Welcome ${
                profile.firstName === "Admin"
                  ? "Admin"
                  : `${profile.firstName} ${profile.lastName}`
              }`}
              <AiFillCaretDown />
            </Menu.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items className="absolute text-black right-0 font-semibold z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-1">
                  {role === "admin" && (
                    <Menu.Item key="admin">
                      <NavLink
                        to="/admin"
                        className="group flex w-full items-center text-sm rounded-md px-2 py-2 hover:bg-gray-200">
                        Admin
                      </NavLink>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <button
                      onClick={openModal}
                      className="group flex w-full items-center justify-between rounded-md text-sm px-2 py-2 hover:bg-gray-200">
                      <span>Top up</span>
                      <span className="text-white text-xs px-2 bg-yellow-600 py-px rounded-full">
                        Php {profile.balance}.00
                      </span>
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={onSignOut}
                      className="group flex w-full items-center rounded-md text-sm px-2 py-2 hover:bg-gray-200">
                      Sign out
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        </Menu>
      ) : (
        <NavLink
          to="/sign-in"
          className="py-1 px-6 bg-white ml-4 bg-opacity-50 hover:bg-yellow-600 rounded-full font-semibold">
          Sign in
        </NavLink>
      )}
    </div>
  );
};

const NavBar = () => {
  const { pathname } = useLocation();
  const { data: profile } = useProfile();
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const filteredNavItems = navItems.filter((item) =>
    profile ? item : item.name !== "My Cars"
  );

  const onSignOut = useCallback(() => {
    auth.signOut();
  }, [auth]);
  return (
    <>
      <AddBalanceModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <MobileNavBar
        filteredNavItems={filteredNavItems}
        onSignOut={onSignOut}
        role={auth.userRole}
        openModal={() => setIsOpen(true)}
      />
      <div className="md:flex hidden items-center justify-between mx-10">
        <img src={Logo} className="w-32" alt="logo" />
        <div className="flex items-center gap-4 font-bold">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={`${
                pathname === item.to ? "text-yellow-600" : ""
              } hover:text-yellow-600`}>
              {item.name}
            </NavLink>
          ))}
          {profile ? (
            <Menu className="relative inline-block text-left">
              <div>
                <Menu.Button className="text-yellow-600 flex items-center gap-1">
                  {`Welcome ${
                    profile.firstName === "Admin"
                      ? "Admin"
                      : `${profile.firstName} ${profile.lastName}`
                  }`}
                  <AiFillCaretDown />
                </Menu.Button>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute text-black right-0 z-10 font-semibold w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-1">
                      {auth.userRole === "admin" && (
                        <Menu.Item>
                          <NavLink
                            to="/admin"
                            className="group flex w-full items-center rounded-md text-sm px-2 py-2 hover:bg-gray-200">
                            Admin
                          </NavLink>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <button
                          onClick={() => setIsOpen(true)}
                          className="group flex w-full items-center justify-between rounded-md text-sm px-2 py-2 hover:bg-gray-200">
                          <span>Top up</span>
                          <span className="text-white text-xs px-2 bg-yellow-600 py-px rounded-full">
                            Php {profile?.balance?.toLocaleString("en-US")}.00
                          </span>
                        </button>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          onClick={onSignOut}
                          className="group flex w-full items-center rounded-md text-sm px-2 py-2 hover:bg-gray-200">
                          Sign out
                        </button>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </div>
            </Menu>
          ) : (
            <NavLink
              to="/sign-in"
              className="py-1 px-6 bg-white bg-opacity-50 hover:bg-yellow-600 rounded-full font-semibold">
              Sign in
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
