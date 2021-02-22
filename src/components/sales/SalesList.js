import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Col } from 'react-bootstrap';

import '../../css/bootstrap.min.css';

import { TableHeadSales } from './TableHeadSales';
import { TableBodySales } from './TableBodySales';
import { removeAction } from '../actions/action';

export const SalesList = () => {
  const { sales } = useSelector((state) => state.sales);
  const { action } = useSelector((state) => state.action);
  const dispatch = useDispatch();
  useEffect(() => {
    if (action) {
      dispatch(removeAction());
    }
  }, [sales, action, dispatch]);
  return (
    <div>
      <Container className="container mt-2 text-center">
        <h4 className="text-muted">Ventas realizadas</h4>
      </Container>
      <Container className="container mb-4">
        <Col className="col-lg-12">
          <div className="main-box clearfix">
            <Table responsive="sm" className="table user-list">
              <TableHeadSales />
              <tbody data={sales}>
                {sales.map((sale) => (
                  <TableBodySales key={sale._id} sale={sale} />
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Container>
    </div>
  );
};
