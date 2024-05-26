import { Link } from "react-router-dom";

import { MdOutlinePersonOff } from "react-icons/md";

export const NotAuthor = () => {
  return (
    <div className="flex flex-col flex-center h-screen w-full">
      <MdOutlinePersonOff size={64} className="mb-2" />
      <h5 className="mb-8 text-medium">No permission.</h5>
      <Link className="btn-primary" to="/">
        Back to home
      </Link>
    </div>
  );
};
