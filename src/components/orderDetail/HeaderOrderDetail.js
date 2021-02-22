import React from 'react';

export const HeaderOrderDetail = ({ qtyProductsOrder }) => {
  return (
    <h4 className="d-flex justify-content-between align-items-center mb-3">
      <span className="text-muted">Listado de productos</span>
      <span className="badge badge-secondary badge-pill">
        {qtyProductsOrder}
      </span>
    </h4>
  );
};
