import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/productAction";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";

import { IoIosArrowBack } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

export const MainLayout = ({ children }) => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.darkMode);
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loading: categoriesLoading } = categoryList;

  const [onCategory, setOnCategory] = useState(true);

  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto flex">
          <div className="main flex-1  ">{children}</div>
          <div
            className="right_side_bar"
            style={{
              width: !onCategory && "0px",
              overflowX: !onCategory && "hidden",
            }}
          >
            {categoriesLoading ? (
              <Loading />
            ) : (
              <>
                {!onCategory && (
                  <div
                    onClick={() => setOnCategory(true)}
                    className="cursor-pointer rounded-full absolute top-2/4
             right-[-2px] -translate-y-2/4"
                  >
                    <IoIosArrowBack />
                  </div>
                )}
                <nav>
                  <li
                    className="flex justify-between px-1 py-4 md:px-4 list-none text-large "
                    onClick={() => setOnCategory(false)}
                  >
                    <h5>Categoty</h5>
                    <FaBars size={32} />
                  </li>
                  {categories.map((category) => (
                    <li
                      key={category}
                      className="p-1 py-4 md:px-4 list-none text-medium hover:underline"
                    >
                      <Link key={category} to={`/categories/${category}`}>
                        {category}
                      </Link>
                    </li>
                  ))}
                </nav>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
