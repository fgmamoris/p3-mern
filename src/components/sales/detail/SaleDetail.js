import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { SaleDetailTableHead } from './SaleDetailTableHead';
import { SaleDetailTableBody } from './SaleDetailTableBody';

export const SaleDetail = () => {
  const { id } = useParams();
  const { sales } = useSelector((state) => state.sales);
  const [saleView, setSaleView] = useState(' ');

  useEffect(() => {
    if (sales.length !== 0) {
      const s = sales.find((s) => s._id === id);
      setSaleView(s);
    }
  }, [setSaleView, sales, id]);

  return (
    <Container className="border mt-2">
      <Row>
        <Col className="col-xs-12">
          <h3>Factura</h3>
          {saleView !== ' ' && <h6># {saleView.code}</h6>}
          <hr />
          {saleView !== ' ' && (
            <Row>
              <Col className="col-xs-6">
                <strong>Cliente</strong>
                <br />
                {saleView.client.fullName}
                <br />
                {saleView.client.email}
                <br />
                {saleView.client.address}
              </Col>
              <Col className="col-xs-6 text-right">
                <strong>Vendedor</strong>
                <br />
                {saleView.seller}
                <br />
                <br />
              </Col>
            </Row>
          )}
          {saleView !== ' ' && (
            <Row>
              <Col className="col-xs-6">
                <strong>
                  {saleView.paymentBreakdown.paymentMethod === 'cash'
                    ? 'Efectivo'
                    : saleView.paymentBreakdown.paymentMethod === 'crediCard'
                    ? 'Tarjeta de crédito'
                    : 'Tarjeta de débito'}
                </strong>
                <br />
                {saleView.paymentBreakdown.paymentMethod !== 'cash'
                  ? saleView.paymentBreakdown.card
                  : ' '}
                <br />
                <br />
              </Col>
              <Col className="col-xs-6 text-right">
                <strong>Fecha de venta</strong>
                <br />
                {saleView.paymentBreakdown.paidDate.substring(0, 10)}
                <br />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h5 className="panel-title">
                <strong>Detalle</strong>
              </h5>
            </div>
            <div className="panel-body">
              <div className="table-responsive">
                <Table className="table table-condensed">
                  <SaleDetailTableHead />
                  {saleView !== ' ' && (
                    <tbody data={saleView.products}>
                      {saleView.products.map((p) => (
                        <SaleDetailTableBody key={p._id} product={p} />
                      ))}
                      <tr>
                        <td className="no-line"></td>
                        <td className="no-line"></td>
                        <td className="no-line"></td>
                        <td className="no-line text-center">
                          <strong>Total</strong>
                        </td>
                        <td className="no-line text-center">
                          $ {saleView.totalAmount}
                        </td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
