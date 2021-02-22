import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../css/bootstrap.min.css';
import '../../css/listUser.css';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { XSquare } from 'react-bootstrap-icons';
import { startCartCancel, startCartUpdateDeleteProduct } from '../actions/cart';

import { removeAction } from '../actions/action';
import Swal from 'sweetalert2';

export const ShopTableBody = ({ product }) => {
  const { products } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const { action } = useSelector((state) => state.action);
  const dispatch = useDispatch();

  const productView = products.filter((p) => p._id === product.product && p)[0];

  const handleDeleteProductCart = (e) => {
    Swal.fire({
      title: 'Desea eliminar el producto:',
      text: `Código: ${productView.code}, Nombre: ${productView.name}`,
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.value) {
        e.preventDefault();
        if (cart.products.length === 1) {
          dispatch(startCartCancel());
        } else {
          dispatch(
            startCartUpdateDeleteProduct({
              _id: product.product,
              qtyOrder: product.qtyOrder,
            })
          );
        }
      }
    });
  };
  useEffect(() => {
    if (action) {
      dispatch(removeAction());
    }
  }, [dispatch, action]);
  return (
    <>
      {!!productView && (
        <tr>
          <td className="text-center"># {productView.code}</td>
          <td className="text-center">{productView.name}</td>
          <td className="text-center">{productView.tradeMark}</td>
          <td className="text-center">{product.qtyOrder}</td>
          <td className="text-right">$ {productView.price}</td>
          <td className="text-right">
            <Button
              className="btn btn-sm btn-danger"
              onClick={handleDeleteProductCart}
            >
              <XSquare></XSquare>
            </Button>
          </td>
        </tr>
      )}
    </>
  );
};
ShopTableBody.propTypes = {
  product: PropTypes.object.isRequired,
};
