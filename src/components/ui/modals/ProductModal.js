import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startAddProductToCart, startNewCart } from '../../actions/cart';

export const ProductModal = ({ props }) => {
  const [validated, setValidated] = useState(false);
  const [show, setShow, product] = props;
  const handleClose = () => setShow(false);
  const [qtyOrder, setQtyOrder] = useState(0);
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { action } = useSelector((state) => state.action);
  const cart = useSelector((state) => state.cart);

  const handleSetQty = (e) => {
    e.preventDefault();
    setQtyOrder(e.target.value);
  };
  const handleAddToCart = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      event.preventDefault();
      if (cart.user === '') {
        dispatch(startNewCart(uid, product._id, qtyOrder));
      } else {
        dispatch(startAddProductToCart(uid, product._id, qtyOrder));
      }
    }
    setValidated(true);
  };
  useEffect(() => {
    if (action) {
      setShow(false);
    }
  }, [action, setShow]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        // keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Marca: {product.tradeMark}</p>
          <p>Precio por unidad: $ {product.price}</p>
        </Modal.Body>
        <Modal.Footer>
          <Form
            inline
            className="ml-1"
            style={{ margin: 'auto' }}
            onSubmit={handleAddToCart}
            noValidate
            validated={validated}
          >
            <Form.Group controlId="formInputQty">
              <Form.Label className="mr-2">Cantidad:</Form.Label>
              <Form.Control
                className="form-control mr-4"
                name="qtyOrder"
                onChange={handleSetQty}
                type="number"
                min={1}
                max={product.qty}
                required
                value={qtyOrder}
                pattern="[0-9]*"
              />
            </Form.Group>

            <Form.Group>
              <Button className="mr-2 my-1" type="submit" variant="success">
                Agregar
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
            </Form.Group>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
};
ProductModal.propTypes = {
  props: PropTypes.array.isRequired,
};
