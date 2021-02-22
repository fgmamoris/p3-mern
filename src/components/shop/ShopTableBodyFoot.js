import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import '../../css/bootstrap.min.css';
import '../../css/listUser.css';
import { useSelector } from 'react-redux';
import { caltulateTotal } from '../../hooks/calculateTotal';

export const ShopTableBodyFoot = (productsOrder) => {
  const [total, setTotal] = useState(0);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    setTotal(caltulateTotal(products, productsOrder.products));
  }, [productsOrder, products]);
  return (
    <>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td className="text-right">
          <strong>Total</strong>
        </td>
        <td className="text-right">
          <strong>$ {total}</strong>
        </td>
      </tr>
    </>
  );
};
ShopTableBodyFoot.propTypes = {
  products: PropTypes.array.isRequired,
  //handleShopDelete: PropTypes.func.isRequired,
};
