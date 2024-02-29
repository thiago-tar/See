import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes, json } from "react-router-dom";

import { SideBar, UserProfile } from "../components";

import { client } from "../client";

import Pins from "./Pins";
import { Logo } from "../components/Logo";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);

  const userInfo = fetchUser();

  const scrollRef = useRef(null);

  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className=" flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial ">
        <SideBar user={user && user} closeToggle={setToggleSidebar} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to={"/"}>
            <Logo.Root>
              <Logo.Icon size={30} color={"black"} />
              <Logo.See className={"text-1xl text-black-50"} />
            </Logo.Root>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt={user?.userName} className="w-28 rounded-2xl" />
          </Link>
        </div>
        {toggleSidebar && (
        <div className="fixed w-full bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(false)}
            />
          </div>
          <SideBar user={user && user} closeToggle={setToggleSidebar} />
        </div>
      )}
      </div>
      
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
