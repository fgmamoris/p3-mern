import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

import { startDeleteUser } from '../../actions/user';

export const UserModal = ({ props }) => {
  const [show, setShow, user] = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        console.log(result.value);
      }
    });
    //dispatch(startDeleteUser(user._id));
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(!show)}
        backdrop="static"
        // keyboard={false}
      >
        <Modal.Header closeButton>
          {/*<Modal.Title>{product.name}</Modal.Title>*/}
          <Modal.Title>
            {user.firstName} {user.lastName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Correo electrónico: {user.email}</p>
          <p>Puesto: {user.employeePosition}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="mr-2 my-1" variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
          <Button variant="secondary" onClick={() => setShow(!show)}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
UserModal.propTypes = {
  props: PropTypes.array.isRequired,
};
