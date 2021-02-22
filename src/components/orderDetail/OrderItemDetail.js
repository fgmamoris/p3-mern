import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const OrderItemDetail = ({ product }) => {
  const { products } = useSelector((state) => state.products);
  const [productView, setProductView] = useState();

  useEffect(() => {
    if (products.length !== 0) {
      setProductView(products.filter((p) => p._id === product.product && p)[0]);
    }
  }, [products, product]);

  return (
    <li className="list-group-item d-flex justify-content-between lh-condensed">
      {productView && (
        <>
          <div>
            <h6 className="my-0">{productView.name}</h6>
            <small className="text-muted">{productView.tradeMark}</small>
          </div>
          <div>
            <span className="text-muted">$ {productView.price}</span>
            <br></br>
            <small className="text-muted float-right">{product.qtyOrder}</small>
          </div>
        </>
      )}
    </li>
  );
};
OrderItemDetail.propTypes = {
  product: PropTypes.object.isRequired,
};
