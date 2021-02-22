import React from 'react';

export const SaleDetailTableHead = () => {
  return (
    <thead>
      <tr>
        <td className="text-center">
          <strong>Código</strong>
        </td>
        <td className="text-center">
          <strong>Producto</strong>
        </td>
        <td className="text-center">
          <strong>Precio</strong>
        </td>
        <td className="text-center">
          <strong>Cantidad</strong>
        </td>
        <td className="text-right">
          <strong>Total</strong>
        </td>
      </tr>
    </thead>
  );
};
