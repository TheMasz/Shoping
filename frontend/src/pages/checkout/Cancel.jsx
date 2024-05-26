import { Link } from "react-router-dom";

import { MdCancel } from "react-icons/md";
import {  useSelector } from "react-redux";

export const Cancel = () => {

  const darkMode = useSelector((state) => state.darkMode);

  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  return (
    <div className="h-screen w-full flex flex-col gap-12 flex-center">
      <MdCancel size={64} className=" text-red-500" />
      <Link className="btn-primary" to="/cart">
        Back to cart
      </Link>
    </div>
  );
};
