"use client";

import { BiUser } from "react-icons/bi";

const UserPage = () => {
  return (
    <div className="dark:text-[#E8DDCE] text-[#291C0E]">
      <h1 className="text-3xl font-bold">
        Welcome to HandyHub
      </h1>

      <div className="mt-6 rounded-2xl bg-[#E8DDCE] p-6 dark:bg-[#181411]">
        <BiUser className="text-5xl text-[#6E473B]" />

        <h2 className="mt-4 text-xl font-semibold">
          Customer Overview
        </h2>

        <p className="mt-2 text-[#6E473B] dark:text[#E8DDCE]">
          Manage your service requests and saved providers from here.
        </p>
      </div>
    </div>
  );
};

export default UserPage;