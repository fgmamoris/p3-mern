import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { Cart4, Person } from 'react-bootstrap-icons';
import { startLogout } from '../actions/auth';

import { useDispatch, useSelector } from 'react-redux';

export const NavBarBoot = () => {
  //const history = useHistory();
  const history = useHistory(); //Puedo usarlo por el Router.Provider, que pasa el history

  const dispatch = useDispatch();
  const { firstName, position } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  /**
   * si no uso location puedo dejarlo asi, pero si uso location
   * <FormControl
   * onSubmit={handleSearchKeyUp}
   * />
   * hago lo siguiente npm install querystring
   * import queryString from 'query-string"
   * const location = useLocation()
   * const location.search
   *    * querystring.parse (location.search)
   * q es el parametro que me interesaria
   * const {q =''}= queryString.parse(location.search)
   * en el useForm configuro el input search como q
   * inputSearch: q; pero si utilizo este metodo tengo que tener en cuenta que no
   * redirecciona a otra pagina, sino que sigue en la misma con el querystring en el url
   */

  const handleLogut = (e) => {
    e.preventDefault();
    dispatch(startLogout());
    history.replace('/login');
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>SuperMarket</Navbar.Brand>
      <Nav className="mr-auto">
        {position === 'gerente' && (
          <NavLink className="nav-item nav-link" exact to="/users">
            Usuarios
          </NavLink>
        )}

        <NavLink className="nav-item nav-link" exact to="/products">
          Productos
        </NavLink>

        {position === 'gerente' && (
          <NavLink className="nav-item nav-link" exact to="/sales">
            Ventas
          </NavLink>
        )}

        {position !== 'gerente' && cart.products.length !== 0 && (
          <NavLink className="nav-item nav-link" exact to="/shop">
            <Cart4 />
          </NavLink>
        )}
      </Nav>

      <Nav.Item className="ml-auto">
        <NavLink
          style={{ color: 'burlywood', justifyItems: 'center' }}
          className="nav-item nav-link"
          exact
          to="/shop"
        >
          <Person
            style={{ color: 'burlywood', justifyItems: 'flex', margin: 'auto' }}
          />
          {firstName}
        </NavLink>
      </Nav.Item>
      <Button variant="outline-success ml-sm-4" onClick={handleLogut}>
        Logout
      </Button>
    </Navbar>
  );
};
