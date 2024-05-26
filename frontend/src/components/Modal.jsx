import React from "react";

export const Modal = ({
  children,
  setModalEdit,
  setModalDelete,
  setModalCreate,
  setOrderStatus,
}) => {
  const closeModal = () => {
    setModalEdit && setModalEdit(false);
    setModalDelete && setModalDelete(false);
    setModalCreate && setModalCreate(false);
    setOrderStatus && setOrderStatus("");
  };
  return (
    <div
      onClick={() => closeModal()}
      className="fixed top-0 left-0 right-0 bottom-0 h-full w-full z-50"
    >
      <div className="bg-gray-800 opacity-50 h-full w-full absolute"></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="p-4 absolute top-12 left-2/4 z-[1000] transform w-full md:w-1/2
      -translate-x-1/2 border rounded-2xl content-bg bg-opacity-90 backdrop-filter 
      backdrop-blur-lg"
      >
        {children}
      </div>
    </div>
  );
};
