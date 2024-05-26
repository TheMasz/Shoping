import { Header } from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../../utils";
import { removeFromCart, updateCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "../../utils/axiosInstant";

import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { CiShoppingBasket } from "react-icons/ci";

export const Cart = () => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.darkMode);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  const setCart = (cartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    dispatch(updateCart(cartItems));
  };

  const increstHandler = (productId) => {
    const updatedCartItems = [...cartItems];
    const productIndex = updatedCartItems.findIndex(
      (item) => item._id === productId
    );

    if (productIndex !== -1) {
      updatedCartItems[productIndex].qty += 1;
    } else {
      updatedCartItems.push({ _id: productId, qty: 1 });
    }
    setCart(updatedCartItems);
  };

  const decrestHandler = (productId) => {
    const updatedCartItems = [...cartItems];
    const productIndex = updatedCartItems.findIndex(
      (item) => item._id === productId
    );
    if (productIndex !== -1) {
      if (updatedCartItems[productIndex].qty > 1) {
        updatedCartItems[productIndex].qty -= 1;
      }
    }

    setCart(updatedCartItems);
  };

  const delHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const totalPrice = () => {
    let total = 0;
    cartItems.map((product) => {
      total += product.price * product.qty;
    });
    return total;
  };

  const checkOutHandler = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
    const body = {
      products: cartItems,
    };
    const response = await axiosInstance.post(
      "/api/products/create-checkout-session",
      body
    );
    const session = await response.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col flex-center w-full py-8">
              <CiShoppingBasket size={64} className="mb-2" />
              <h5 className="mb-8 text-medium">Cart is empty</h5>
              <Link className="btn-primary" to="/">
                Go to shopping
              </Link>
            </div>
          ) : (
            <>
              <table className=" shadow-md rounded-lg w-full my-4 content-bg">
                <thead className=" mb-4 border-b">
                  <tr>
                    <th className="w-[40%] p-2 md:p-4 text-medium text-start ">
                      Product
                    </th>
                    <th className="w-[15%] py-4 text-medium">Price</th>
                    <th className="w-[15%] py-4 text-medium">Quanity</th>
                    <th className="w-[15%] py-4 text-medium">Sum Price</th>
                    <th className="w-[15%] py-4 text-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((product, index) => (
                    <tr key={index}>
                      <td className="p-1 md:p-4">
                        <div className="flex flex-col md:flex-row items-start">
                          <div className="h-16 w-20 md:h-36 md:w-40  bg-gray-400"></div>
                          <div className="px-1 md:px-4">
                            <h5 className="text-medium">{product.name}</h5>
                            <p className="text-small">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-1 md:p-4">
                        {formatNumber(product.price)}฿
                      </td>
                      <td className="p-1 md:p-4">
                        <div className="flex items-center justify-center">
                          <button
                            disabled={product.qty == 1}
                            style={{
                              cursor: product.qty == 1 && "not-allowed",
                            }}
                            onClick={() => decrestHandler(product._id)}
                          >
                            <TiArrowSortedDown />
                          </button>
                          <p className="px-2">{product.qty}</p>
                          <button
                            disabled={product.qty >= product.countInStock}
                            style={{
                              cursor:
                                product.qty >= product.countInStock &&
                                "not-allowed",
                            }}
                            onClick={() => increstHandler(product._id)}
                          >
                            <TiArrowSortedUp />
                          </button>
                        </div>
                        <p className="text-center text-small">
                          ({product.countInStock} in stock)
                        </p>
                      </td>
                      <td className="text-center p-1 md:p-4">
                        {formatNumber(product.price * product.qty)}฿
                      </td>
                      <td className="text-center p-1 md:p-4 text-red-500 hover:text-red-700">
                        <button onClick={() => delHandler(product._id)}>
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="shadow-md rounded-lg w-full p-4 content-bg ">
                <div className="flex gap-4 items-center justify-end mb-4">
                  {!userInfo.tel || !userInfo.address ? (
                    <div>
                      <p>
                        Add your address and tel first{" "}
                        <span>
                          <Link
                            className="text-sky-500 underline"
                            to="/profile/edit"
                          >
                            click
                          </Link>
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-right">Tel: {userInfo.tel}</p>
                      <p className="text-right">Address: {userInfo.address}</p>
                      <p className="text-right">
                        If you want to change{" "}
                        <span>
                          <Link
                            className="text-sky-500 underline text-right"
                            to="/profile/edit"
                          >
                            click
                          </Link>
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 items-center justify-end">
                  <p className="text-medium">
                    Quantity of products ({cartItems.length} orders):
                    <span className="text-rose-500">
                      {" "}
                      {formatNumber(totalPrice())}฿
                    </span>
                  </p>
                  <button
                    onClick={() => checkOutHandler()}
                    className="btn-primary"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};
