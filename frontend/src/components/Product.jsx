import { formatNumber } from "../utils";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartAction";

export const Product = ({ product }) => {
  const dispatch = useDispatch();
  const addToCartHandler = (product_id) => {
    dispatch(addToCart(product_id, 1));
  };
  return (
    <div className="shadow-xl rounded-md max-w-48 w-full">
      <div className=" h-40 bg-gray-400"></div>
      <div className="p-2 content-bg">
        <div className="flex items-start justify-between mb-4 ">
          <div>
            <h5
              className="text-medium truncate w-full max-w-full"
              style={{ maxWidth: "7rem" }}
            >
              {product.name}
            </h5>
            <p className="text-small ">{product.category}</p>
          </div>
          <p>{formatNumber(product.price)}฿</p>
        </div>

        <div className="flex justify-end">
          <button
            className="btn-primary"
            onClick={() => addToCartHandler(product._id)}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};
