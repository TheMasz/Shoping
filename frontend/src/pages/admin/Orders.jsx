import { useEffect, useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/Loading";
import {
  deleteOrder,
  getAllOrder,
  updateOrder,
} from "../../actions/orderAction";

import { MdEdit, MdDelete } from "react-icons/md";
import { Modal } from "../../components/Modal";
import { formatDate, formatNumber } from "../../utils";
import { useSnackbar } from "notistack";
import {
  ORDER_DELETE_RESET,
  ORDER_UPDATE_RESET,
} from "../../constants/orderConstant";
import { CiShoppingBasket } from "react-icons/ci";
import { Pagination } from "../../components/Pagination";

export const Orders = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, totalPages, currentPage } = orderList;
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const { success: updateSuccess, loading: updateLoading } = orderUpdate;
  const orderDelete = useSelector((state) => state.orderDelete);
  const { success: deleteSuccess, loading: deleteLoading } = orderDelete;

  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const submitEdit = () => {
    dispatch(updateOrder(orderStatus, orderId));
  };

  const submitDelete = () => {
    dispatch(deleteOrder(orderId));
  };

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar("Order deleted.", { variant: "success" });
      dispatch({ type: ORDER_DELETE_RESET });
      setModalDelete(false);
      setOrderId("");
      setOrderStatus("");
    }
    if (updateSuccess) {
      enqueueSnackbar("Order updated.", { variant: "success" });
      dispatch({ type: ORDER_UPDATE_RESET });
      setModalEdit(false);
      setOrderId("");
      setOrderStatus("");
    }
  }, [deleteSuccess, updateSuccess, dispatch, enqueueSnackbar]);

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <h3 className="text-large mb-4">Orders</h3>
        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="flex flex-col flex-center w-full py-8">
            <CiShoppingBasket size={64} className="mb-2" />
            <h5 className="mb-8 text-medium">Orders is empty</h5>
          </div>
        ) : (
          <>
            <table className="shadow-md rounded-lg w-full my-4 content-bg mb-12">
              <thead>
                <tr>
                  <th className="py-4 w-[5%]">ID</th>
                  <th className="py-4 w-[35%]">Products</th>
                  <th className="py-4 w-[20%]">Date Order</th>
                  <th className="py-4 w-[15%]">Payment</th>
                  <th className="py-4 w-[15%]">Status</th>
                  <th className="py-4 w-[10%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="p-1 md:p-4 text-center text-wrap">{order._id}</td>
                    <td className="p-1 md:p-4">
                      {order.products.map((product) => (
                        <div
                          key={product.productDetails._id}
                          className="flex gap-2 items-center mb-2"
                        >
                          <div className="min:h-8 min:w-8 h-8 w-8 bg-gray-500"></div>
                          <p>
                            {product.productDetails.name}{" "}
                            <span className="text-rose-500">
                              x {product.qty}
                            </span>{" "}
                            {formatNumber(product.productDetails.price)}฿/1{" "}
                            <span className="text-green-600">
                              {formatNumber(
                                product.productDetails.price * product.qty
                              )}
                              ฿
                            </span>
                          </p>
                        </div>
                      ))}
                    </td>
                    <td className="p-1 md:p-4">
                      <p className="text-center">
                        {formatDate(order.createdAt)}
                      </p>
                    </td>
                    <td className="p-1 md:p-4">
                      <p
                        className={`text-center ${
                          order.payment === "pending"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {order.payment}
                      </p>
                    </td>
                    <td className="p-1 md:p-4">
                      <p
                        className={`text-center ${
                          order.status === "pending"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {order.status}
                      </p>
                    </td>
                    <td className="p-1 md:p-4">
                      <div className="flex gap-4 justify-center items-center">
                        <button
                          onClick={() => {
                            setModalEdit(true);
                            setOrderId(order._id);
                          }}
                        >
                          <MdEdit />
                        </button>
                        <button
                          onClick={() => {
                            setModalDelete(true);
                            setOrderId(order._id);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-center">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                getAllOrder={getAllOrder}
                pagePage={15}
              />
            </div>
          </>
        )}

        {modalEdit && (
          <Modal setModalEdit={setModalEdit} setOrderStatus={setOrderStatus}>
            <select
              className="content-bg mb-4 w-full"
              onChange={(e) => setOrderStatus(e.target.value)}
              value={orderStatus}
            >
              <option value="" disabled>
                Select Order Status
              </option>
              <option value="pending">Pending</option>
              <option value="shipping">Shipping</option>
            </select>
            <div className="flex items-center justify-end">
              <button
                className="btn-secondary"
                onClick={() => submitEdit(orderStatus)}
              >
                {updateLoading ? <Loading /> : "Submit"}
              </button>
            </div>
          </Modal>
        )}

        {modalDelete && (
          <Modal setModalDelete={setModalDelete}>
            <h2 className="text-large mb-12">
              Are you want to delete this product?
            </h2>
            <div className="flex items-center justify-end gap-4">
              <button onClick={() => setModalDelete(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => submitDelete()}>
                {deleteLoading ? <Loading /> : "Delete"}
              </button>
            </div>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};
