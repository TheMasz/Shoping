import { useEffect, useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Forms } from "../../components/Forms";
import { Modal } from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  PRODUCT_DELETE_RESET,
  PRODUCT_UPDATE_RESET,
} from "../../constants/productContant";
import { deleteProduct, getProducts } from "../../actions/productAction";
import { formatNumber } from "../../utils";
import { Loading } from "../../components/Loading";
import { Pagination } from "../../components/Pagination";

export const Products = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const productList = useSelector((state) => state.productList);
  const {
    loading: productsLoading,
    products,
    totalPages,
    currentPage,
  } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { success: deleteSuccess } = productDelete;
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: updateSuccess } = productUpdate;
  const productCreate = useSelector((state) => state.productCreate);
  const { success: createSuccess } = productCreate;

  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [productId, setProductId] = useState(null);

  const deleteHandler = (productId) => {
    setProductId(productId);
    setModalDelete(true);
  };

  const EditHandler = (productId) => {
    setModalEdit(true);
    setProductId(productId);
  };

  useEffect(() => {
    dispatch(getProducts(1, 21));
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar("Product deleted.", { variant: "success" });
      dispatch({ type: PRODUCT_DELETE_RESET });
      setModalDelete(false);
    }
    if (updateSuccess) {
      enqueueSnackbar("Product updated.", { variant: "success" });
      dispatch({ type: PRODUCT_UPDATE_RESET });
      setModalEdit(false);
    }
    if (createSuccess) {
      setModalCreate(false);
    }
  }, [deleteSuccess, updateSuccess, createSuccess, dispatch, enqueueSnackbar]);

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-large ">Products</h3>
          <button className="btn-primary" onClick={() => setModalCreate(true)}>
            Create Product
          </button>
        </div>
        {productsLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex items-center justify-center md:justify-start gap-5 flex-wrap mb-12">
              {products?.map((product, index) => (
                <div
                  key={index}
                  className="shadow-xl rounded-md max-w-48 w-full"
                >
                  <div className="h-40 bg-gray-400"></div>
                  <div className="p-2 content-bg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h5
                          className="text-medium truncate w-full max-w-full"
                          style={{ maxWidth: "7rem" }}
                        >
                          {product.name}
                        </h5>
                        <p className="text-small">{product.category}</p>
                      </div>
                      <p>{formatNumber(product.price)}฿</p>
                    </div>
                    <div className="flex justify-end items-center gap-2">
                      <button
                        className="p-1 rounded-xl text-white text-medium bg-sky-500 hover:bg-sky-700"
                        onClick={() => EditHandler(product._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="p-1 rounded-xl text-white text-medium bg-red-500 hover:bg-red-700"
                        onClick={() => deleteHandler(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                getProducts={getProducts}
                perPage={20}
              />
            </div>
          </>
        )}
        {modalCreate && (
          <Modal setModalCreate={setModalCreate}>
            <div className="flex flex-col  items-center">
              <h2 className="text-large mb-2">Create Product</h2>
              <Forms action="create" />
            </div>
          </Modal>
        )}
        {modalEdit && (
          <Modal setModalEdit={setModalEdit}>
            <div className="flex flex-col  items-center">
              <h2 className="text-large mb-2">Edit Product</h2>
              <Forms action="update" productId={productId} />
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
              <button
                className="btn-primary"
                onClick={() => dispatch(deleteProduct(productId))}
              >
                Delete
              </button>
            </div>
          </Modal>
        )}
      </div>
    </AdminLayout>
  );
};
