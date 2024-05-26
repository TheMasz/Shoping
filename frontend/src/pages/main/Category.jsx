import { useParams } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../../actions/productAction";
import { Product } from "../../components/Product";
import { Loading } from "../../components/Loading";
import { Pagination } from "../../components/Pagination";

export const Category = () => {
  const dispatch = useDispatch();
  const { category } = useParams();

  const productsCategory = useSelector((state) => state.productsCategory);
  const { products, loading, totalPages, currentPage } = productsCategory;

  useEffect(() => {
    dispatch(getProductsByCategory(category));
  }, [dispatch, category]);

  return (
    <MainLayout>
      <h3 className="text-medium mb-6">Category: {category}</h3>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className=" flex items-center gap-5 flex-wrap mb-12">
            {products?.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              getProductsByCategory={getProductsByCategory}
              perPage={10}
              category={category}
            />
          </div>
        </>
      )}
    </MainLayout>
  );
};
