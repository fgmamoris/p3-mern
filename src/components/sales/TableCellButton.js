import React from 'react';
import { Button } from 'react-bootstrap';
import { Trash, FileTextFill } from 'react-bootstrap-icons';
import '../../css/bootstrap.min.css';
import '../../css/listUser.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const TableCellButton = (props) => {
  //{code} lo desectructuro por que tengo las props.code, que viene en las propierties del componente
  const { _id, handleShowDelete } = props;

  return (
    <td style={{ width: '15%' }} className="text-center">
      <Button variant="danger" className="mr-1" onClick={handleShowDelete}>
        <Trash></Trash>
      </Button>
      <Link to={`./sales/${_id}`}>
        <Button variant="primary" className="mr-1">
          <FileTextFill />
        </Button>
      </Link>
    </td>
  );
};
TableCellButton.propTypes = {
  _id: PropTypes.string.isRequired,
  handleShowDelete: PropTypes.func.isRequired,
};
