import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Button,
  Form,
  Image,
  Col,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/bootstrap.min.css';
import { emailValidation } from '../../hooks/emailValidation';
import { startAddNewUser, startUpdateUser } from '../actions/user';
import { removeAction } from '../actions/action';

import { AvatarUser } from '../ui/AvatarUser';
const initiUser = {
  firstName: '',
  lastName: '',
  password: '',
  email: '',
  employeePosition: '',
  mediaUrl: '',
};

export const RegisterUser = () => {
  /**
   * Me toma el params como code (?) así que tengo que hacer un cambio de parametro
   */
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { users } = useSelector((state) => state.users);
  const { action } = useSelector((state) => state.action);

  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState(initiUser);
  const {
    firstName,
    lastName,
    email,
    password,
    employeePosition,
    mediaUrl,
  } = formValues;
  const [avatar, setAvatar] = useState(null);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  var option = [
    { label: 'Gerente', value: 'gerente' },
    { label: 'Vendedor', value: 'vendedor' },
  ];

  useEffect(() => {
    if (id && users.length !== 0) {
      const userUpdate = users.find((user) => user._id === id);
      userUpdate.password = '';
      setFormValues(userUpdate);
    } else {
      setFormValues(initiUser);
    }
    if (action) {
      dispatch(removeAction());
      history.push('/');
    }
    console.log(avatar);
  }, [action, history, dispatch, id, users]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      event.preventDefault();
      if (!emailValidation(email)) {
        Swal.fire('Error', 'El formato del email es incorrecto', 'error');
      } else {
        if (id) {
          dispatch(startUpdateUser(formValues, avatar));
        } else {
          
          dispatch(startAddNewUser(formValues));
          if (!action) {
            formValues.email = '';
          }
        }
      }
      setValidated(true);
    }
  };

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
              <AvatarUser avatar={avatar} setAvatar={setAvatar} />
            </Col>
          </div>
          <Row>
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Nombre usuario</Form.Label>
              <Form.Control
                className="form-control"
                name="firstName"
                onChange={handleInputChange}
                placeholder="Nombre"
                type="text"
                required
                value={firstName}
                minLength={4}
              />
              <Form.Control.Feedback>Valido!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Ingrese un nombre válido
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Apellido usuario</Form.Label>
              <Form.Control
                name="lastName"
                onChange={handleInputChange}
                placeholder="Apellido"
                type="text"
                required
                value={lastName}
                minLength={4}
              />
              <Form.Control.Feedback>Valido!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Ingrese un apellido válido
              </Form.Control.Feedback>
            </Form.Group>
            {/**<Form.Group as={Col} md="12" controlId="validationCustomUsername"> */}
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Correo electrónico</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="email"
                  onChange={handleInputChange}
                  placeholder="Correo electrónico"
                  type="email"
                  required
                  aria-describedby="inputGroupPrepend"
                  value={email}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un correo electrónico válido
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom04">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={handleInputChange}
                placeholder="Contraseña"
                type="text"
                required
                aria-describedby="inputGroupPrepend"
                value={password}
                minLength={6}
              />
              <Form.Control.Feedback>Valido!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                La contraseña debe tener al menos 6 caracteres
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom05">
              <Form.Label>Puesto</Form.Label>
              <Form.Control
                required
                as="select"
                type="select"
                name="employeePosition"
                md={3}
                onChange={handleInputChange}
                onSelect={handleInputChange}
                value={employeePosition}
              >
                <option value="">Seleccionar una opción</option>
                {option.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Debe seleccionar un puesto para el empleado.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>
        </Form>
      </Col>
    </Container>
  );
};
