import React, { useEffect, useState } from 'react';
import { Container, Button, Form, Col, Row } from 'react-bootstrap';
import '../../css/bootstrap.min.css';
import '../../css/register.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startAddNewProduct, startUpdateProduct } from '../actions/product';
import { removeAction } from '../actions/action';
import { Avatar } from '../ui/Avatar';
import Swal from 'sweetalert2';

const initProduct = {
  name: '',
  tradeMark: '',
  description: '',
  price: '',
  qty: '',
  mediaUrl: '',
};

export const RegisterProduct = ({ history }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { action } = useSelector((state) => state.action);
  const [validated, setValidated] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [formValues, setFormValues] = useState(initProduct);
  const { name, tradeMark, description, price, qty } = formValues;

  const handleInputChange = ({ target }) => {
    console.log(target);
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      event.preventDefault();
      if (id) {
        //Deberia ver si tengo imagen y sino agregarla, file===null
        dispatch(startUpdateProduct(formValues, avatar));
      } else {
        //lo mismo tengo que ver si tengo imagen del producto para actualizarla
        dispatch(startAddNewProduct(formValues, avatar));
      }
    }
    setValidated(true);
  };

  useEffect(() => {
    if (id && products.length !== 0) {
      const productUpdate = products.find((p) => p._id === id);
      setFormValues(productUpdate);
    } else {
      setFormValues(initProduct);
    }
    if (action) {
      Swal.close();
      Swal.fire(
        'Acción confirmada',
        'Producto modificado con éxito',
        'success'
      );
      dispatch(removeAction());
      history.push('/products');
    }
  }, [action, history, dispatch, id, products]);

  return (
    <Container className="mx-auto my-3">
      <Col
        className="col-8"
        style={{
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          justifyItems: 'center',
          margin: 'auto',
        }}
      >
        <Form validated={validated} onSubmit={handleSubmit}>
          <div>
            <Col
              className="d-flex justify-content-center"
              style={{ height: '230px' }}
            >
              <Avatar
                avatar={avatar}
                setAvatar={setAvatar}
                imgUrl={formValues.mediaUrl}
                handleInputChange={handleInputChange}
              />
            </Col>
          </div>
          <Row>
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                className="form-control"
                name="name"
                onChange={handleInputChange}
                placeholder="Nombre"
                type="text"
                required
                value={name}
                minLength={3}
                maxLength={18}
              />
              <Form.Control.Feedback>Válido!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Debe ingresar un nombre válido!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                className="form-control"
                name="tradeMark"
                onChange={handleInputChange}
                placeholder="Marca"
                type="text"
                required
                value={tradeMark}
                minLength={4}
              />
              <Form.Control.Feedback>Válido!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Debe ingresar una marca!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                className="form-control"
                name="description"
                onChange={handleInputChange}
                placeholder="Descripción del producto"
                type="text"
                value={description}
              ></Form.Control>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                className="form-control"
                name="qty"
                onChange={handleInputChange}
                type="text"
                required
                value={qty}
                placeholder="Stock"
                pattern="[0-9]*"
              />
              <Form.Control.Feedback>Válido!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Debe ingresar una cantidad válida!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                className="form-control"
                name="price"
                onChange={handleInputChange}
                placeholder="Precio"
                type="number"
                required
                value={price}
                min={0.01}
                step={0.01}
              />
              {/*inputMode="number"*/}
              <Form.Control.Feedback>Válido!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Debe ingresar una precio válido!
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">Registrar</Button>
        </Form>
      </Col>
    </Container>
  );
};
