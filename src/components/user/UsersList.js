import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Table, Col, Button } from 'react-bootstrap';

import '../../css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { TableHeadUsers } from '../user/TableHeadUsers';
import { TableBodyUsers } from '../user/TableBodyUsers';

import { PersonPlus } from 'react-bootstrap-icons';
import { removeAction } from '../actions/action';

export const UsersList = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { action } = useSelector((state) => state.action);

  useEffect(() => {
    if (action) {
      dispatch(removeAction());
    }
  }, [users, action, dispatch]);

  return (
    <div>
      <Container>
        <Row>
          <Row className="mx-3">
            <Link to={`./user`}>
              <Button className="btn-block my-3" variant="outline-secondary">
                <PersonPlus />
              </Button>
            </Link>
          </Row>

          <Col className="col-lg-12">
            <div className="main-box clearfix">
              <Table responsive="sm" className="table user-list">
                <TableHeadUsers />
                <tbody data={users}>
                  {users.map((user) => (
                    <TableBodyUsers key={user._id} user={user} />
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
