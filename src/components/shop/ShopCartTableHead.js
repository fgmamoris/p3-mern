import React from 'react';
import '../../css/bootstrap.min.css';

export const ShopCartTableHead = () => {
  return (
    <thead>
      <tr>
        <th scope="col" className="text-center">Código</th>
        <th scope="col" className="text-center">
          <span>Producto</span>
        </th>
        <th scope="col" className="text-center">
          <span>Marca</span>
        </th>
        <th scope="col" className="text-center">
          <span>Cantidad</span>
        </th>
        <th scope="col" className="text-center">
          <span>Precio unitario</span>
        </th>
        <th scope="col" className="text-center">
          <span>Quitar item</span>
        </th>
      </tr>
    </thead>
  );
};
