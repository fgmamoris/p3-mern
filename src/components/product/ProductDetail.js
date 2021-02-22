import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Container,
  Row,
  Badge,
  ListGroup,
} from 'react-bootstrap';
import '../../css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const product = {
  qty: '',
  name: '',
  tradeMark: '',
  price: '',
};
export const ProductDetail = ({ history }) => {
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);
  const [productView, setProductView] = useState(product);

  const handleReturn = (e) => {
    e.preventDefault();
    history.goBack();
    if (history.length >= 2) {
      history.push('/');
    } else {
      history.goBack();
    }
  };
  useEffect(() => {
    if (products.length !== 0) {
      const p = products.find((p) => p._id === id);
      setProductView(p);
    }
    // else {
    //   setProductView(product);
    // }
  }, [products, id]);
  return (
    <Container
      className="animate__animated animate__fadeInLeftBig"
      style={{
        width: '70%',
        overflow: 'hidden',
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Card className="border-0">
        <div>
          {productView.qty > 0 ? (
            <Badge pill variant="success" className="ml-4">
              En stock
            </Badge>
          ) : (
            <Badge pill variant="danger" className="ml-4">
              Sin stock
            </Badge>
          )}
        </div>
        <Card.Img
          variant="top"
          src={productView.mediaUrl}
          className="d-flex align-items-center"
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
        <Card.Body>
          <Card.Title>
            <ListGroup>
              <ListGroup.Item>
                <h4>{productView.name}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>Marca: {productView.tradeMark}</h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>Descripción: {productView.description}</h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6 className="text-muted">Precio: ${productView.price}</h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6 className="text-muted">Stock: {productView.qty}</h6>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button
                    variant="bnt btn-outline-info ml-2"
                    onClick={handleReturn}
                  >
                    Return
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};
// ProductDetail.propTypes = {
//   product: PropTypes.object.isRequired,
// };
//src={pathImg}
