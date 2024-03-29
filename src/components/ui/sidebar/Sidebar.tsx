"use client";

import Link from "next/link";

import {
  IoCloseOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoTicketOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoShirtOutline,
  IoPeopleOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store/index";

import { useSession } from "next-auth/react";

import clsx from "clsx";
import { logout } from "@/actions";

const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={() => closeMenu()}
          className="fade-in fixed top-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
            "translate-x-0": isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={25}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        {/* Menu options */}
        {isAuthenticated ? (
          <>
            <Link
              onClick={() => closeMenu()}
              href="/profile"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={25} />
              <span className="ml-3 text-xl">Profile</span>
            </Link>

            <Link
              onClick={() => closeMenu()}
              href="/orders"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={25} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>

            <button
              className="w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => logout()}
            >
              <IoLogOutOutline size={25} />
              <span className="ml-3 text-xl">Log out</span>
            </button>
          </>
        ) : (
          <Link
            onClick={() => closeMenu()}
            href="/auth/login"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline size={25} />
            <span className="ml-3 text-xl">Log in</span>
          </Link>
        )}

        {isAuthenticated && isAdmin && (
          <>
            {/* Line separator */}
            <div className="w-full h-px bg-gray-200 my-10" />

            <Link
              onClick={() => closeMenu()}
              href="/admin/products"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={25} />
              <span className="ml-3 text-xl">Products</span>
            </Link>

            <Link
              onClick={() => closeMenu()}
              href="/admin/orders"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={25} />
              <span className="ml-3 text-xl">Orders</span>
            </Link>

            <Link
              onClick={() => closeMenu()}
              href="/admin/users"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={25} />
              <span className="ml-3 text-xl">Users</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
