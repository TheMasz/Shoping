import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../actions/productAction";
import { Loading } from "../../components/Loading";
import { Product } from "../../components/Product";
import { Pagination } from "../../components/Pagination";
import { MainLayout } from "./MainLayout";

export const Homepage = () => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.darkMode);
  const productList = useSelector((state) => state.productList);
  const { products, loading, currentPage, totalPages } = productList;

  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <MainLayout>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className=" flex justify-center md:justify-start 
          items-center gap-5 flex-wrap mb-12 px-2 sm:px-0">
            {products?.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              getProducts={getProducts}
              perPage={10}
            />
          </div>
        </>
      )}
    </MainLayout>
  );
};
