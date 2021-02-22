import React from 'react';
import { Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../../css/bootstrap.min.css';
import '../../css/listUser.css';
import Swal from 'sweetalert2';

import { TableCellButton } from './TableCellButton';
import { useDispatch } from 'react-redux';

import { startDeleteUser } from '../actions/user';
export const TableBodyUsers = ({ user }) => {
  const dispatch = useDispatch();

  const handleShowDelete = (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Desea eliminar el usuario:',
      text: `${user.firstName + ' ' + user.lastName}`,
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.value) {
        dispatch(startDeleteUser(user._id));
      }
    });
  };

  return (
    <tr>
      <td style={{ width: '25em' }}>
        <Image
          src={user.mediaUrl}
          alt=""
          className="card-columns animate__animated animate__fadeIn"
          style={{
            width: '50px',
            height: '50px',
          }}
        />
        <span className="user-link">
          {user.firstName + ' ' + user.lastName}
        </span>
      </td>
      <td className="text-center" style={{ width: '20em' }}>
        <span className="user-subhead ">{user.email}</span>
      </td>
      <td className="text-center">
        <span>{user.employeePosition}</span>
      </td>
      <TableCellButton uid={user._id} handleShowDelete={handleShowDelete} />
    </tr>
  );
};
TableBodyUsers.propTypes = {
  user: PropTypes.object.isRequired,
  //handleShopDelete: PropTypes.func.isRequired,
};
