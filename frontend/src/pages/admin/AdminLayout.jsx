import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleDarkMode } from "../../actions/themeAction";

import { BsMoonStars, BsMoonStarsFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { signout } from "../../actions/userAction";

export const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  
  const darkMode = useSelector((state) => state.darkMode);
  
  const [sidebar, setSidebar] = useState(true);

  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  return (
    <section className="max-h-screen h-screen flex">
      <div
        className="relative left_side_bar"
        style={{ width: !sidebar && "15px", overflowX: !sidebar && "hidden" }}
      >
        {!sidebar && (
          <div
            onClick={() => setSidebar(true)}
            className="cursor-pointer rounded-full absolute top-2/4
             right-[-2px] -translate-y-2/4"
          >
            <IoIosArrowForward />
          </div>
        )}
        <ul className="">
          <li className="p-4 cursor-pointer flex items-center justify-between">
            <Link to="/admin">
              <h3 className="text-large">Admin</h3>
            </Link>
            <FaBars size={32} onClick={() => setSidebar((prev) => !prev)} />
          </li>
          <li className="p-4 cursor-pointer">
            <Link className="text-medium" to="/admin">
              Dashboard
            </Link>
          </li>
          <li className="p-4 cursor-pointer">
            <Link className="text-medium" to="/">
              Homepage
            </Link>
          </li>
          <li className="p-4 cursor-pointer">
            <Link className="text-medium" to="/admin/products">
              Products
            </Link>
          </li>
          <li className="p-4 cursor-pointer">
            <Link className="text-medium" to="/admin/orders">
              Orders
            </Link>
          </li>
          <li className="p-4 cursor-pointer">
            <button onClick={() => dispatch(signout())} className="text-medium">
              Logout
            </button>
          </li>
          <li className="p-4">
            <label className="inline-flex items-center cursor-pointer">
              <input
                onClick={() => dispatch(toggleDarkMode())}
                onChange={() => {}}
                type="checkbox"
                checked={darkMode}
                className="sr-only peer"
              />
              <div
                className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none 
        peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 
        rounded-full peer  peer-checked:after:translate-x-full 
        rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
        after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
        after:bg-white after:border-gray-300 after:border after:rounded-full 
        after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"
              ></div>
              <span className="ms-3 text-medium">
                {darkMode ? <BsMoonStarsFill /> : <BsMoonStars />}
              </span>
            </label>
          </li>
        </ul>
      </div>
      <div className="main overflow-y-auto px-4">{children}</div>
    </section>
  );
};
