import React from 'react';
import '../../css/bootstrap.min.css';

export const TableHeadSales = () => {
  return (
    <thead>
      <tr>
        <th scope="col" className="text-center">
          <span>Número</span>
        </th>
        <th scope="col" className="text-center">
          <span>Vendedor</span>
        </th>
        <th className="text-center">
          <span>Cliente</span>
        </th>
        <th className="text-center">
          <span>Fecha</span>
        </th>
        <th className="text-center">
          <span>Total $</span>
        </th>
        <th className="text-center">
          <span>Estado</span>
        </th>
        <th className="text-center">
          <span>Factura</span>
        </th>
      </tr>
    </thead>
  );
};
