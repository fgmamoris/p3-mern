import React from 'react';
import PropTypes from 'prop-types';

export const OrderDetailFoot = ({ total }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span>Total</span>
      <strong>$ {total}</strong>
    </li>
  );
};
OrderDetailFoot.propTypes = {
  total: PropTypes.number.isRequired,
};
