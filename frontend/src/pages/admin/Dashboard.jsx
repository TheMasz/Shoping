import { useEffect } from "react";
import { formatNumber } from "../../utils";
import { AdminLayout } from "./AdminLayout";

import { FaRegClipboard, FaInbox, FaUser } from "react-icons/fa";
import {
  MdOutlinePendingActions,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/Loading";
import { getDashboard } from "../../actions/dashboardAction";

export const Dashboard = () => {
  const dispatch = useDispatch();

  const dashboard = useSelector((state) => state.dashboard);
  const { analysis, loading } = dashboard;

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  return (
    <AdminLayout>
      <div className="container mx-auto">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h3 className="text-large mb-6">Dashboard</h3>
            <div className="flex gap-2">
              <div className="flex flex-wrap max-w-[392px] gap-2">
                <div className="content-bg p-4 max-w-48 w-full rounded-2xl shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-medium">Orders</h5>
                    <FaRegClipboard size={32} />
                  </div>
                  <h1 className=" text-4xl font-bold">
                    {formatNumber(analysis.totalOrders)}
                  </h1>
                </div>
                <div className="content-bg p-4 max-w-48 w-full rounded-2xl shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-medium">Products</h5>
                    <FaInbox size={32} />
                  </div>
                  <h1 className="text-4xl font-bold">
                    {formatNumber(analysis.totalProducts)}
                  </h1>
                </div>
                <div className="content-bg p-4 max-w-48 w-full rounded-2xl shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-medium">Pending</h5>
                    <MdOutlinePendingActions size={32} />
                  </div>
                  <h1 className="text-4xl font-bold text-yellow-500">
                    {formatNumber(analysis.pendingOrders)}
                  </h1>
                </div>
                <div className="content-bg p-4 max-w-48 w-full rounded-2xl shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-medium">Shipping</h5>
                    <MdOutlineLocalShipping size={32} />
                  </div>
                  <h1 className="text-4xl font-bold text-green-500">
                    {formatNumber(analysis.shippingOrders)}
                  </h1>
                </div>
              </div>
              <div className="flex-1 flex gap-2 flex-wrap ">
                <div className="flex-1 content-bg rounded-2xl p-4 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Income</h2>
                    <TbMoneybag size={32} />
                  </div>
                  <h1 className="text-4xl font-bold text-green-500">
                    {formatNumber(analysis.totalPrice)}฿
                  </h1>
                </div>
                <div className="flex-1 content-bg rounded-2xl p-4 shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Users</h2>
                    <FaUser size={32} />
                  </div>
                  <h1 className="text-4xl font-bold mb-2">
                    {formatNumber(analysis.totalUsers)}
                  </h1>
                  <p>User ordered: {analysis.usersWithOrders}</p>
                  <p>User non-ordered: {analysis.usersWithoutOrders}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};
