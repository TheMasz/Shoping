import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { useEffect } from "react";
import { getMyOrder } from "../../actions/orderAction";
import { formatDate, formatNumber } from "../../utils";

export const Order = () => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.darkMode);
  const orderMineList = useSelector((state) => state.orderMineList);
  const { orders, loading } = orderMineList;

  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  const totalPrice = (order) => {
    let total = 0;
    order.products.map((product) => {
      total += product.qty * product.productDetails.price;
    });
    return total;
  };

  useEffect(() => {
    dispatch(getMyOrder());
  }, []);

  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto">
          {loading ? (
            <Loading />
          ) : (
            <>
              {orders.length === 0 ? (
                <div>no order</div>
              ) : (
                <div className="content-bg p-4 my-4 rounded-xl shadow-xl">
                  {orders.map((order) => (
                    <div className="border-b py-4" key={order._id}>
                      {order.products.map((product) => (
                        <div
                          key={product._id}
                          className="flex flex-col md:flex-row gap-2 md:items-start justify-between mb-4"
                        >
                          <div className="h-16 w-20 md:h-36 md:w-40 bg-gray-400"></div>
                          <div className="flex flex-1 items-start justify-between">
                            <h5 className="text-medium">
                              {product.productDetails.name}
                            </h5>
                            <div>
                              <div className="flex gap-4 mb-2 items-center">
                                <p>x{product.qty}</p>
                                <p>
                                  {formatNumber(product.productDetails.price)}฿
                                </p>
                              </div>
                              <p>
                                Total{" "}
                                {formatNumber(
                                  product.productDetails.price * product.qty
                                )}
                                ฿
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-end">
                        <div>
                          <p className="text-medium text-center sm:text-end ">
                            Status{" "}
                            <span
                              className={`${
                                order.status === "pending"
                                  ? "text-yellow-600"
                                  : "text-green-600"
                              }`}
                            >
                              {order.status}
                            </span>
                          </p>
                          <p className="text-medium text-center sm:text-end">
                            Buy when {formatDate(order.createdAt)}
                          </p>
                          <p className="text-medium text-center sm:text-end">
                            Total price {formatNumber(totalPrice(order))}฿
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};
