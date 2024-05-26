import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateProfile } from "../../actions/userAction";
import { useSnackbar } from "notistack";
import { validatePhoneNumber } from "../../utils";
import { Loading } from "../../components/Loading";
import { USER_UPDATE_RESET } from "../../constants/userConstant";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const darkMode = useSelector((state) => state.darkMode);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success, loading } = userUpdate;

  const [username, setUsername] = useState(userInfo.username || "");
  const [tel, setTel] = useState(userInfo.tel || "");
  const [address, setAddress] = useState(userInfo.address || "");

  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  const submitHandler = () => {
    if (username === "") {
      return enqueueSnackbar("Username cannot empty", { variant: "warning" });
    }
    if (tel !== "") {
      const isValid = validatePhoneNumber(tel);
      if (!isValid)
        return enqueueSnackbar("Format telephone not correct.", {
          variant: "warning",
        });
    }
    dispatch(updateProfile(username, address, tel));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      enqueueSnackbar("Profile updated.", { variant: "success" });
    }
  }, [dispatch, success, enqueueSnackbar]);

  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto ">
          <dir className="content-bg w-full flex my-4 shadow-xl rounded-xl">
            <div className=" max-w-72 w-full border-r">
              <ul className="p-4">
                <li className="text-medium py-4 border-b">
                  <Link to="/profile/edit">Edit Profile</Link>
                </li>
                <li className="text-medium py-4 border-b">
                  <Link to="/profile/change-password">Change Password</Link>
                </li>
              </ul>
            </div>
            <div className="flex-1 p-4">
              <p>Email:</p>
              <div className="input-wrap">
                <input type="email" value={userInfo.email} disabled />
              </div>
              <p>Username:</p>
              <div className="input-wrap">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <p>Tel:</p>
              <div className="input-wrap">
                <input
                  type="tel"
                  placeholder="tel"
                  value={tel}
                  maxLength={15}
                  onChange={(e) => setTel(e.target.value)}
                />
              </div>
              <p>Address</p>
              <div className="input-wrap">
                <input
                  type="text"
                  placeholder="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="btn-secondary"
                  onClick={() => submitHandler()}
                >
                  {loading ? <Loading /> : "Submit"}
                </button>
              </div>
            </div>
          </dir>
        </div>
      </section>
    </>
  );
};
