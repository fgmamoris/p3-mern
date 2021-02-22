/*
Creacion de rutas, rutas padres e hijas
npm install react-router-dom
npm install -g create-react-app
*/
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm';
import '../css/bootstrap.min.css';
import '../css/signin.css';

import Swal from 'sweetalert2';
import { startLogin } from '../components/actions/auth';
import { emailValidation } from '../hooks/emailValidation';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);

  const [formValues, handleInputChange] = useForm({
    inputEmail: '',
    inputPassword: '',
  });
  const { inputEmail, inputPassword } = formValues;

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else if (form.checkValidity() === true) {
      event.preventDefault();
      if (!emailValidation(inputEmail)) {
        Swal.fire('Error', 'El formato del email es incorrecto', 'error');
      } else {
        dispatch(startLogin(inputEmail, inputPassword));
      }
    }
    setValidated(true);
  };

  return (
    <div className="form text-center" style={{ height: '100vh' }}>
      <Form
        className="form-signin"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="formBasicEmail">
          <h1 className="h3 mb-3 font-weight-normal ">Login</h1>
          <hr />

          <Form.Control
            className="form-control"
            name="inputEmail"
            onChange={handleInputChange}
            placeholder="Email address"
            type="email"
            required
            value={inputEmail}
          />
          <Form.Control.Feedback type="valid">Válido!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Ingrese un nombre válido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            //className={`form-control ${!validPass}`}
            className="form-control"
            name="inputPassword"
            onChange={handleInputChange}
            placeholder="Password"
            type="password"
            required
            value={inputPassword}
            minLength={6}
          />
          <Form.Control.Feedback type="valid">Válido!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            La contraseña debe tener al menos 6 caracteres!
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </Button>
        <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
      </Form>
    </div>
  );
};
