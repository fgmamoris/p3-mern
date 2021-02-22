import React from 'react';
import PropTypes from 'prop-types';

export const SaleDetailTableBody = ({ product }) => {
  console.log(product);
  return (
    <tr>
      <td className="text-center">
        <span># {product.code}</span>
      </td>
      <td className="text-center">
        <span>{product.name}</span>
      </td>
      <td className="text-center">
        <span>{product.price}</span>
      </td>
      <td className="text-center">
        <span>{product.qty}</span>
      </td>
      <td className="text-center">
        <span>{product.amountProduct}</span>
      </td>
    </tr>
  );
};
SaleDetailTableBody.propTypes = {
  product: PropTypes.object.isRequired,
  //handleShopDelete: PropTypes.func.isRequired,
};
