import React, { useEffect, useState } from 'react';
import '../../css/chekcout.css';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { caltulateTotal } from '../../hooks/calculateTotal';
import { productsInvoice } from '../../hooks/productsInvoice';
import { removeAction } from '../actions/action';
import { starNewSale } from '../actions/sale';
import { HeaderOrderDetail } from '../orderDetail/HeaderOrderDetail';
import { OrderItemDetail } from '../orderDetail/OrderItemDetail';
import { OrderDetailFoot } from '../orderDetail/OrderDetailFoot';
import { validateCreditDateExpiration } from '../../hooks/validateCreditDateExpiration';


const initSale = {
  fullName: '',
  address: '',
  email: '',
  paymentMethod: '',
  card: '',
  expiredDate: '',
  date: '',
  cvv: '',
  totalAmount: '',
  nameFullCard: '',
};
export const CheckOut = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { uid } = useSelector((state) => state.auth);
  const { action } = useSelector((state) => state.action);
  const { products } = useSelector((state) => state.products);
  const history = useHistory();
  const [formValues, setFormValues] = useState(initSale);
  const [msgExpireDate, setMsgExpireDate] = useState('');
  const [validDate, setValidDate] = useState('');
  const [validated, setValidated] = useState(false);
  const [productsPass, setProductsPass] = useState();

  const {
    fullName,
    address,
    email,
    paymentMethod,
    card,
    expiredDate,
    date,
    cvv,
    totalAmount,
    nameFullCard,
  } = formValues;

  var option = [
    { label: 'Efectivo', value: 'cash' },
    { label: 'Débito', value: 'debitCard' },
    { label: 'Crédito', value: 'creditCard' },
  ];

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const handleInputNumber = ({ target }) => {
    target.value === '' &&
      setFormValues({
        ...formValues,
        [target.name]: target.value,
      });
    /^([0-9]*)$/.test(target.value) &&
      setFormValues({
        ...formValues,
        [target.name]: target.value,
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      event.preventDefault();
      if (formValues.paymentMethod !== 'cash') {
        const { msg, valid } = validateCreditDateExpiration(
          formValues.expiredDate
        );
        setValidDate(valid);
        setMsgExpireDate(msg);
        if (validDate === 'false') {
          formValues.products = productsInvoice(products, productsPass);
          formValues.date = new Date();
          dispatch(starNewSale(formValues));
        }
      } else {
        setValidDate('false');
        formValues.products = productsInvoice(products, productsPass);
        formValues.date = new Date();
        dispatch(starNewSale(formValues));
      }
    }
    setValidated(true);
  };

  useEffect(() => {
    if (cart.user !== '') {
      setProductsPass(cart.products);
      if (products) {
        formValues.totalAmount = caltulateTotal(products, cart.products);
      }
    }
    if (action) {
      dispatch(removeAction());
      history.replace('/products');
    }
  }, [action, products, cart, uid, formValues, dispatch, history]);

  return (
    <Container className="mt-4">
      <Row>
        <Col className="col-md-5 order-md-2 mb-4">
          {productsPass && (
            <HeaderOrderDetail qtyProductsOrder={productsPass.length} />
          )}
          {
            <ul className="list-group mb-3">
              {productsPass &&
                productsPass.map((product) => (
                  <OrderItemDetail key={product._id} product={product} />
                ))}
              {formValues.totalAmount !== 0 &&
                formValues.totalAmount !== '' && (
                  <OrderDetailFoot total={parseInt(formValues.totalAmount)} />
                )}
            </ul>
          }
        </Col>
        <Col className="col-md-6">
          <h4 className="mb-3">Datos del cliente</h4>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col className="col-10 mb-3">
                <Form.Group controlId="validationCustom01">
                  <Form.Label>
                    <h6 className="mb-1">Nombre completo</h6>
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    name="fullName"
                    onChange={handleInputChange}
                    placeholder="Nombre"
                    type="text"
                    required
                    value={fullName}
                    minLength={3}
                  />
                  <Form.Control.Feedback>Válido!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Debe ingresar un nombre válido!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom02">
                  <Form.Label>
                    <h6 className="mb-1">Correo de facturación</h6>
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    name="email"
                    onChange={handleInputChange}
                    placeholder="Correo electrónico"
                    type="email"
                    value={email}
                  />
                </Form.Group>
                <Form.Group controlId="validationCustom03">
                  <Form.Label>
                    <h6 className="mb-1">Dirección cliente</h6>
                  </Form.Label>
                  <Form.Control
                    className="form-control"
                    name="address"
                    onChange={handleInputChange}
                    placeholder="Dirección"
                    type="text"
                    required
                    value={address}
                    minLength={3}
                  />
                  <Form.Control.Feedback>Válido!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Debe ingresar una direción!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className="col-8 mb-3">
                <Form.Group controlId="validationCustom04">
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    name="paymentMethod"
                    onChange={handleInputChange}
                    onSelect={handleInputChange}
                    value={paymentMethod}
                  >
                    <option value="">Seleccionar una opción</option>
                    {option.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Debe seleccionar un método de pago.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            {(paymentMethod === 'debitCard' ||
              paymentMethod === 'creditCard') && (
              <Row>
                <Col className="col-10 mb-3">
                  <Form.Group controlId="validationCustom05">
                    <Form.Label>
                      <h6 className="mb-1">
                        Nombre completo tarjeta de credito
                      </h6>
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      name="nameFullCard"
                      onChange={handleInputChange}
                      placeholder="Nombre"
                      type="text"
                      required
                      value={nameFullCard}
                      minLength={3}
                    />
                    <Form.Control.Feedback>Válido!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Debe ingresar un nombre válido!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col className="col-8 mb-3">
                  <Form.Group controlId="validationCustom06">
                    <Form.Label>
                      <h6 className="mb-1">Número de tarjeta de credito</h6>
                    </Form.Label>
                    <Form.Control
                      className="form-control"
                      name="card"
                      onChange={handleInputNumber}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      type="text"
                      required
                      value={card}
                      minLength={16}
                      maxLength={16}
                    />
                    <Form.Control.Feedback>Válido!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Número invalido!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Row className="ml-1">
                  <Col className="col-4 mb-3">
                    <Form.Group controlId="validationCustom07">
                      <Form.Label>
                        <h6 className="mb-1">Vencimiento</h6>
                      </Form.Label>
                      <Form.Control
                        className={` ${
                          validDate === 'true'
                            ? 'form-control is-invalid'
                            : 'form-control'
                        }`}
                        name="expiredDate"
                        onChange={handleInputNumber}
                        placeholder="MMAA"
                        type="text"
                        value={expiredDate}
                        minLength={4}
                        maxLength={4}
                        required
                        isInvalid={validDate}
                      />
                      {validDate === 'true' ? (
                        <Form.Control.Feedback type="invalid">
                          {msgExpireDate}
                        </Form.Control.Feedback>
                      ) : (
                        ''
                      )}
                    </Form.Group>
                  </Col>

                  <Col className="col-3 mb-3">
                    <Form.Group controlId="validationCustom08">
                      <Form.Label>
                        <h6 className="mb-1">CVV</h6>
                      </Form.Label>
                      <Form.Control
                        className="form-control"
                        name="cvv"
                        onChange={handleInputNumber}
                        placeholder="***"
                        type="password"
                        required
                        value={cvv}
                        minLength={3}
                        maxLength={3}
                      />
                      <Form.Control.Feedback>Válido!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        Número invalido!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
            )}
            <Button variant="success" className="btn" type="submit">
              Confrimar venta
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
