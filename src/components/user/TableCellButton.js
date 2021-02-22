import React from 'react';
import { Button } from 'react-bootstrap';
import { Trash, Pencil } from 'react-bootstrap-icons';
import '../../css/bootstrap.min.css';
import '../../css/listUser.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const TableCellButton = (props) => {
  //{code} lo desectructuro por que tengo las props.code, que viene en las propierties del componente
  const { uid, handleShowDelete } = props;

  return (
    <td style={{ width: '20%' }} className="text-center">
      <Button variant="danger" className="mr-2 ml-2" onClick={handleShowDelete}>
        <Trash></Trash>
      </Button>
      <Link to={`../user/${uid}`}>
        <Button variant="secondary" className="mr-2 ml-2">
          <Pencil />
        </Button>
      </Link>
    </td>
  );
};
TableCellButton.propTypes = {
  uid: PropTypes.string.isRequired,
  handleShowDelete: PropTypes.func.isRequired,
};
