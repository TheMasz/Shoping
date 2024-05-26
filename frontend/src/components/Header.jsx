import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleDarkMode } from "../actions/themeAction";
import { useState } from "react";
import { signout } from "../actions/userAction";

import { BsMoonStars, BsMoonStarsFill } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

export const Header = () => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.darkMode);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [dropdown, setDropdown] = useState(false);

  return (
    <header className="px-2 py-8 shadow-xl content-bg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/">
          <h2 className="text-large">Shop</h2>
        </Link>
        <div className="flex gap-8 items-center">
          {userInfo.role === "admin" && <Link to="/admin">Admin</Link>}
          <Link to="/cart" className="relative">
            <FiShoppingCart />
            <span className="text-center font-light text-white absolute right-[-20px] bottom-[-15px] w-6 h-6 rounded-full bg-rose-500">
              {cartItems.length}
            </span>
          </Link>
          <div
            onClick={() => setDropdown((prev) => !prev)}
            className="relative avatar-sm ml-4"
          >
            {dropdown && (
              <ul className="dropdown">
                <li className="p-2 border-b border-slate-50 w-full">
                  <Link to="/profile/edit">Edit Profile</Link>
                </li>
                <li className="p-2 border-b border-slate-50 w-full">
                  <Link to="/order">My Order</Link>
                </li>
                <li className="p-2 border-b border-slate-50 w-full">
                  <button onClick={() => dispatch(signout())}>Logout</button>
                </li>
              </ul>
            )}
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              onClick={() => dispatch(toggleDarkMode())}
              onChange={() => {}}
              type="checkbox"
              checked={darkMode}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-medium">
              {darkMode ? <BsMoonStarsFill /> : <BsMoonStars />}
            </span>
          </label>
        </div>
      </div>
    </header>
  );
};
