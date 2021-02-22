import React, { useEffect } from 'react';
import { Button, Container, Row, Col, Table } from 'react-bootstrap';
import { CheckSquare, XSquare } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import '../../css/bootstrap.min.css';

import { startCartCancel } from '../actions/cart';
import { ShopCartTableHead } from './ShopCartTableHead';
import { ShopTableBody } from './ShopTableBody';
import { ShopTableBodyFoot } from './ShopTableBodyFoot';

export const ShopCart = () => {
  const cart = useSelector((state) => state.cart);
  const { action } = useSelector((state) => state.action);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDeleteCart = (e) => {
    Swal.fire({
      title: 'Desea cancelar la orden de venta?',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.value) {
        e.preventDefault();
        dispatch(startCartCancel());
        history.replace('/products');
      }
    });
  };

  useEffect(() => {
    if (cart.products.length === 0) {
      history.replace('/products');
    }
  }, [cart, action, dispatch, history]);

  return (
    <div>
      <Container className="container mt-2 text-center">
        <h4 className="text-muted">Venta</h4>
      </Container>
      <Container className="container mb-4">
        <Row>
          <Col className="col-12">
            <div className="main-box clearfix">
              <Table responsive="sm" className="table user-list">
                <ShopCartTableHead />
                {cart.products.length !== 0 && (
                  <tbody data={cart.products}>
                    {cart.products.length !== 0 &&
                      cart.products.map((product) => (
                        <ShopTableBody key={product._id} product={product} />
                      ))}
                    {cart.products.length !== 0 && (
                      <ShopTableBodyFoot products={cart.products} />
                    )}
                  </tbody>
                )}
              </Table>
            </div>
          </Col>
          {cart.products.length !== 0 && (
            <Col className="col-12">
              <Link to={`/checkout`}>
                <Button className="btn" variant="success">
                  Finalizar venta
                  <CheckSquare />
                </Button>
              </Link>
              <Button
                className="btn ml-2 "
                variant="danger"
                onClick={handleDeleteCart}
              >
                Cancelar venta <XSquare></XSquare>
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};
