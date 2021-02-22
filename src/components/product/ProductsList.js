import React, { useEffect } from 'react';
import { CardColumns, Container, Button, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CloudPlus } from 'react-bootstrap-icons';

import '../../css/bootstrap.min.css';
import { CardProduct } from './CardProduct';
import { removeAction } from '../actions/action';

export const ProductsList = () => {
  /* Tendria que confirurar la querystring aca para saber si viene alguna busqueda o no, porque ya lo tengo
   * configurado en el dashBoardRoutes, y el string inicial es vacio,
   * por lo que podría preguntar como viene el string, si viene vacio, buscar todos los productos,
   * y si viene con algo realizar la busqueda y pasar solo ese producto
   *
   */
  const { position } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { action } = useSelector((state) => state.action);

  useEffect(() => {
    
    if (action) {
      dispatch(removeAction());
    }
  }, [products, action, dispatch]);
  return (
    <div>
      <Col className="col-lg-12">
        <Container className="my-3">
          {position === 'gerente' && (
            <Link to={`./product`}>
              <Button className="my-3" variant="outline-secondary">
                <CloudPlus />
              </Button>
            </Link>
          )}

          <hr />
          <CardColumns>
            {products.map((product) => (
              <CardProduct key={product._id} product={product} />
            ))}
          </CardColumns>
        </Container>
      </Col>
    </div>
  );
};
