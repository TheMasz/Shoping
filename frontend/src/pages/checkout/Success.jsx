import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";

import { FaCheckCircle } from "react-icons/fa";
import { createOrder } from "../../actions/orderAction";
import { ORDER_CREATE_RESET } from "../../constants/orderConstant";

export const Success = () => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.darkMode);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { success } = orderCreate;

  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  useEffect(() => {
    cartItems.length != 0 && dispatch(createOrder(cartItems));
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(clearCart());
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, success]);

  return (
    <div className="h-screen w-full flex flex-col gap-12 flex-center">
      <FaCheckCircle size={64} className=" text-green-500" />
      <div className="flex gap-4">
        <Link className="btn-transparent" to="/">
          Go to homepage
        </Link>
        <Link className="btn-primary " to="/order">
          View My Orders
        </Link>
      </div>
    </div>
  );
};
