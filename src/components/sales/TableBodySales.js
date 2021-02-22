import React from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import '../../css/bootstrap.min.css';
import '../../css/listUser.css';

import { TableCellButton } from './TableCellButton';
import { starUpdateSale } from '../actions/sale';
import Swal from 'sweetalert2';

export const TableBodySales = ({ sale }) => {
  const dispatch = useDispatch();

  const handleShowDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Desea cancelar la venta',
      text: `Factura: #${sale.code}`,
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.value) {
        dispatch(starUpdateSale(sale._id));
      }
    });
  };

  return (
    <tr>
      <td className="text-center">
        <span># {sale.code}</span>
      </td>
      <td className="text-center">
        <span>{sale.seller}</span>
      </td>
      <td className="text-center">
        <span>{sale.client.fullName}</span>
      </td>
      <td className="text-center">
        <span>{sale.paymentBreakdown.paidDate.substring(0, 10)}</span>
      </td>
      <td className="text-center">
        <span>{sale.totalAmount}</span>
      </td>
      <td className="text-center">
        <span>{sale.state === 'active' ? 'Confirmada' : 'Cancelada'}</span>
      </td>
      <TableCellButton _id={sale._id} handleShowDelete={handleShowDelete} />
    </tr>
  );
};
TableBodySales.propTypes = {
  sale: PropTypes.object.isRequired,
  //handleShopDelete: PropTypes.func.isRequired,
};
