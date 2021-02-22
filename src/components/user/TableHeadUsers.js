import React from 'react';
import '../../css/bootstrap.min.css';

export const TableHeadUsers = () => {
  return (
    <thead>
      <tr>
        <th scope="col" className="text-center">
          <span>Usuario</span>
        </th>
        <th scope="col" className="text-center">
          <span>Correo electrónico</span>
        </th>
        <th className="text-center">
          <span>Puesto</span>
        </th>
        <th className="text-center">
          <span>Acción</span>
        </th>
      </tr>
    </thead>
  );
};
