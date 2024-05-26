import { useEffect, useState } from "react";
import { BiHide } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { signup } from "../../actions/userAction";
import { Loading } from "../../components/Loading";

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userSignup = useSelector((state) => state.userSignup);
  const { loading, error } = userSignup;

  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassoword, setCfPassword] = useState("");
  const [showPs, setShowPs] = useState(false);
  const [showCfPs, setShowCfPs] = useState(false);

  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      return enqueueSnackbar("Email is not correct pattern.", {
        variant: "warning",
      });
    }
    if (password.length < 8 || cfPassoword.length < 8) {
      return enqueueSnackbar(
        "Password should have a length less than 8 characters.",
        {
          variant: "warning",
        }
      );
    }
    dispatch(signup(email, password, cfPassoword));
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "user") return navigate("/");
      if (userInfo.role === "admin") return navigate("/admin");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (error) enqueueSnackbar(error, { variant: "warning" });
  }, [error, enqueueSnackbar]);

  return (
    <section className="relative  min-h-screen flex items-center">
      <div className="flex w-full container mx-auto z-40">
        <div className="hidden md:block">
          <img className="w-full h-full " src="/ecom-1.png" alt="ecom-img" />
        </div>
        <div className="flex-1 flex flex-center">
          <form className="p-12 shadow-lg rounded-xl max-w-96 w-full content-bg">
            <h1 className="text-large">Sign up</h1>
            <p className="text-small mb-4">
              for new exprerince and enjoy shopping.
            </p>
            <div className="input-wrap mb-4">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrap mb-4 relative">
              <input
                type={showPs ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute right-2 top-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPs((prev) => !prev);
                }}
              >
                <BiHide />
              </button>
            </div>
            <div className="input-wrap mb-4 relative">
              <input
                type={showCfPs ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setCfPassword(e.target.value)}
              />
              <button
                className="absolute right-2 top-2"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCfPs((prev) => !prev);
                }}
              >
                <BiHide />
              </button>
            </div>
            <Link to="/signin" className=" text-small">
              If you already have an account?
              <span className="text-sky-500 underline">click</span>
            </Link>
            <div className="flex flex-center mt-4">
              <button className="btn-primary" onClick={(e) => submitHandler(e)}>
                {loading ? <Loading /> : "Signup"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <img
        src="/curve-1.png"
        alt="cruve"
        className="w-full max-h-[423px] absolute bottom-0 left-0 right-0"
      />
    </section>
  );
};
