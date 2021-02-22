import Swal from 'sweetalert2';

import { types } from '../../types/types';
import { fetchConToken } from '../helpers/fetch';
import { confirmAction } from './action';
import { startLogout } from './auth';
import { startUpdateProductQty } from './product';

export const startCartCheking = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`cart/user`, {}, 'GET');
      const body = await resp.json();
      if (body.ok) {
        const cart = body.cart;
        dispatch(cartChecking(cart));
      } else if (body.msg === 'Token invalid') {
        dispatch(startLogout());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const cartChecking = (cart) => ({
  type: types.cartChecking,
  payload: cart,
});

export const startNewCart = (uid, _id, qtyOrder) => {
  return async (dispatch) => {
    const cart = {
      user: uid,
      products: [{ product: _id, qtyOrder: qtyOrder }],
    };
    try {
      const resp = await fetchConToken('cart/new', cart, 'POST');
      const body = await resp.json();
      if (body.ok) {
        cart._id = body.cart._id;
        dispatch(cartChecking(body.cart));
        dispatch(startUpdateProductQty(_id, qtyOrder, 'rest'));
        dispatch(confirmAction());
        Swal.fire('Producto agregado al carro');
      } else if (body.msg === 'Token invalid') {
        dispatch(startLogout());
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const startAddProductToCart = (uid, _id, qtyOrder) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`cart/user`, {}, 'GET');
      const body = await resp.json();
      if (body.ok) {
        const cartUpdate = body.cart;
        const foundProduct = cartUpdate.products.filter(
          (p) => p.product === _id
        );
        let pUpdate;
        foundProduct.length === 0
          ? cartUpdate.products.push({ product: _id, qtyOrder: qtyOrder })
          : (pUpdate = cartUpdate.products.map((p) =>
              p.product === _id
                ? {
                    product: _id,
                    qtyOrder: parseInt(qtyOrder) + parseInt(p.qtyOrder),
                  }
                : p
            ));
        cartUpdate.products =
          foundProduct.length === 0 ? cartUpdate.products : pUpdate;
        try {
          const resp = await fetchConToken(
            `cart/${cartUpdate._id}`,
            cartUpdate,
            'PUT'
          );
          const body = await resp.json();
          if (body.ok) {
            dispatch(cartChecking(body.cart));
            dispatch(startUpdateProductQty(_id, qtyOrder, 'rest'));
            dispatch(confirmAction());
            Swal.fire('Producto agregado al carro');
          } else if (body.msg === 'Token invalid') {
            dispatch(startLogout());
          } else {
            Swal.fire('Error', body.msg, 'error');
          }
        } catch (error) {
          console.log(error);
        }
      } else if (body.msg === 'Token invalid') {
        dispatch(startLogout());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startCartUpdateDeleteProduct = ({ _id, qtyOrder }) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`cart/user`, {}, 'GET');
      const body = await resp.json();
      if (body.ok) {
        let cartUpdate = body.cart;
        cartUpdate.products = cartUpdate.products.filter(
          (p) => p.product !== _id
        );
        try {
          const resp = await fetchConToken(
            `cart/${cartUpdate._id}`,
            cartUpdate,
            'PUT'
          );
          const body = await resp.json();
          if (body.ok) {
            dispatch(cartChecking(body.cart));
            dispatch(startUpdateProductQty(_id, qtyOrder, 'add'));
            dispatch(confirmAction());
          } else if (body.msg === 'Token invalid') {
            dispatch(startLogout());
          } else {
            Swal.fire('Error', body.msg, 'error');
          }
        } catch (error) {
          console.log(error);
        }
      } else if (body.msg === 'Token invalid') {
        dispatch(startLogout());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startCartCancel = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`cart/user`, {}, 'GET');
      const body = await resp.json();
      if (body.ok) {
        const cartDelete = body.cart;
        cartDelete.products.forEach((p) => {
          dispatch(startUpdateProductQty(p.product, p.qtyOrder, 'add'));
        });
        try {
          const resp = await fetchConToken(
            `cart/${cartDelete._id}`,
            {},
            'DELETE'
          );
          const body = await resp.json();
          if (body.ok) {
            dispatch(cartDeleted());
          } else if (body.msg === 'Token invalid') {
            dispatch(startLogout());
          } else {
            console.log(body.msg);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(body.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const startCartDelete = (id) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`cart/${id}`, {}, 'DELETE');
      const body = await resp.json();
      if (body.ok) {
        dispatch(cartDeleted(id));
      } else if (body.msg === 'Token invalid') {
        dispatch(startLogout());
      } else {
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const cartDeleted = () => ({
  type: types.cartDeleted,
});
