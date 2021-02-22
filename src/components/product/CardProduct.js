import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Badge } from 'react-bootstrap';
import {
  FileTextFill,
  CartPlusFill,
  Trash,
  Pencil,
} from 'react-bootstrap-icons';
import '../../css/bootstrap.min.css';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ProductModal } from '../ui/modals/ProductModal';
import { useSelector, useDispatch } from 'react-redux';
import { startDeleteProduct } from '../actions/product';
import Swal from 'sweetalert2';

export const CardProduct = ({ product }) => {
  const { position } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleShopItem = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  useEffect(() => {}, [show]);

  const handleDelete = () => {
    Swal.fire({
      title: 'Desea eliminar el producto:',
      text: `Código: ${product.code}, Nombre: ${product.name}`,
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.value) {
        dispatch(startDeleteProduct(product._id));
        history.push('/products');
      }
    });
  };

  return (
    <Container className="animate__animated animate__fadeIn">
      {show && <ProductModal props={[show, setShow, product]} />}
      <Card border="dark" style={{ maxWidth: '18rem' }}>
        <div>
          {product.qty > 0 ? (
            <Badge pill variant="success" className="ml-1">
              En stock
            </Badge>
          ) : (
            <Badge pill variant="danger" className="ml-1">
              Sin stock
            </Badge>
          )}
        </div>

        <Container
          className="d-flex align-items-center "
          style={{
            height: '18rem',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Card.Img
            variant="top"
            src={product.mediaUrl}
            className="d-flex align-items-center "
            alt={product.code}
            style={{
              height: ' auto',
              width: ' auto',
              maxWidth: '300px',
              maxHeight: '300px',
              overflow: 'hidden',
              objectFit: 'contain',
              margin: 'auto',
            }}
          />
        </Container>

        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text
            style={{
              maxLines: 3,
              maxHeight: 50,
              overflow: 'hidden',
            }}
          >
            {product.tradeMark}
          </Card.Text>
          <small className="text-muted">Código: ${product.code}</small>
          <br />
          <small className="text-muted">Precio: ${product.price}</small>
          <br />
          <small className="text-muted">Stock: {product.qty}</small>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Row className="d-flex justify-content-end">
            {position === 'vendedor' && (
              <>
                <Link to={`./product/detail/${product._id}`}>
                  <Button variant="primary" className="mr-2 ml-auto">
                    <FileTextFill />
                  </Button>
                </Link>
                {product.qty > 0 && (
                  <Button
                    variant="light"
                    className="mr-2 ml-2"
                    onClick={handleShopItem}
                  >
                    <CartPlusFill></CartPlusFill>
                  </Button>
                )}
              </>
            )}
            {position === 'gerente' && (
              <>
                <Link to={`../product/${product._id}`}>
                  <Button variant="secondary" className="mr-2 ml-2">
                    <Pencil />
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  className="mr-2 ml-2"
                  onClick={handleDelete}
                >
                  <Trash></Trash>
                </Button>
              </>
            )}
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  );
};
CardProduct.propTypes = {
  product: PropTypes.object.isRequired,
};
