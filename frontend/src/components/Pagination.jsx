import { useDispatch } from "react-redux";

export const Pagination = ({
  totalPages,
  currentPage,
  getProducts,
  getAllOrder,
  getProductsByCategory,
  perPage,
  category,
}) => {
  const dispatch = useDispatch();
  if (totalPages === 0) return null;

  const navigateHandler = (index) => {
    getProducts && dispatch(getProducts(index, perPage));
    getAllOrder && dispatch(getAllOrder(index, perPage));
    getProductsByCategory && getProductsByCategory(category, index, perPage);
  };

  const pages = [];
  const maxVisiblePages = 5;
  const maxPagesToShow = Math.min(totalPages, maxVisiblePages);

  let startPage, endPage;

  if (currentPage <= Math.floor(maxVisiblePages / 2) + 1) {
    startPage = 1;
    endPage = maxPagesToShow;
  } else if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
    startPage = totalPages - maxPagesToShow + 1;
    endPage = totalPages;
  } else {
    startPage = currentPage - Math.floor(maxVisiblePages / 2);
    endPage = currentPage + Math.floor(maxVisiblePages / 2);
  }

  if (startPage !== 1) {
    pages.push(
      <button key="first" onClick={() => navigateHandler(1)}>
        1
      </button>
    );
    if (startPage > 2) {
      pages.push(<span key="ellipsis-start">...</span>);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        style={{ color: i === currentPage ? "#fff" : "" }}
        className={`px-4 py-2 rounded-2xl text-medium hover:bg-rose-600 hover:text-white ${
          i === currentPage && "bg-rose-500"
        }`}
        onClick={() => navigateHandler(i)}
      >
        {i}
      </button>
    );
  }

  if (endPage !== totalPages) {
    if (endPage < totalPages - 1) {
      pages.push(<span key="ellipsis-end">...</span>);
    }
    pages.push(
      <button key="last" onClick={() => navigateHandler(totalPages)}>
        {totalPages}
      </button>
    );
  }

  return pages;
};
