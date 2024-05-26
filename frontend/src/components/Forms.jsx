import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../actions/productAction";
import { Loading } from "./Loading";
import { useSnackbar } from "notistack";
import {
  PRODUCT_CREATE_RESET,
} from "../constants/productContant";

export const Forms = ({ action, productId }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading: detailLoading } = productDetails;
  const productCreate = useSelector((state) => state.productCreate);
  const { success: createSuccess, loading: createLoading } = productCreate;
  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: updateLoading } = productUpdate;

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
    if (name == "" || detail == "" || category == "") {
      enqueueSnackbar("Please fill all fields.", { variant: "info" });
    } else if (qty == 0 || price == 0) {
      enqueueSnackbar("Quantity or price should not be 0.", {
        variant: "info",
      });
    } else {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("detail", detail);
      fd.append("category", category);
      fd.append("qty", Number(qty));
      fd.append("price", Number(price));
      if (action === "create") dispatch(createProduct(fd));
      if (action === "update") dispatch(updateProduct(fd, productId));
    }
  };

  useEffect(() => {
    if (action === "update") {
      dispatch(getProduct(productId));
    }
  }, [dispatch, productId, action]);

  useEffect(() => {
    if (action === "update" && product) {
      setName(product.name);
      setDetail(product.desc);
      setCategory(product.category);
      setQty(product.qty);
      setPrice(product.price);
    }
  }, [product, action]);

  useEffect(() => {
    if (createSuccess) {
      setName("");
      setDetail("");
      setCategory("");
      setQty("");
      setPrice("");
      dispatch({ type: PRODUCT_CREATE_RESET });
      enqueueSnackbar("Product created.", { variant: "success" });
    }
  }, [createSuccess, dispatch, enqueueSnackbar]);

  return (
    <div className="content-bg  p-4 shadow-xl rounded-xl max-w-3xl  w-full">
      {detailLoading ? (
        <Loading />
      ) : (
        <>
          <h6 className="text-medium">Name:</h6>
          <div className="input-wrap mb-4">
            <input
              type="text"
              placeholder="Name Product"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <h6 className="text-medium">Details:</h6>
          <div className="input-wrap mb-4">
            <input
              type="text"
              value={detail || ""}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="Details Product"
            />
          </div>
          <h6 className="text-medium">Category:</h6>
          <div className="input-wrap mb-4">
            <input
              type="text"
              value={category || ""}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category Product"
            />
          </div>
          <h6 className="text-medium">Quantity:</h6>
          <div className="input-wrap">
            <input
              type="number"
              value={qty || 0}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Qty Product"
            />
          </div>
          <h6 className="text-medium">Price:</h6>
          <div className="input-wrap">
            <input
              type="number"
              value={price || 0}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price Product"
            />
          </div>
          <div className="flex items-center justify-end">
            <button className="btn-secondary" onClick={(e) => submitHandler(e)}>
              {action === "create" ? "Create" : "Update"}
              {createLoading && <Loading />}
              {updateLoading && <Loading />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
