import Swal from 'sweetalert2';

import { types } from '../../types/types';
import { fetchConToken } from '../helpers/fetch';
import { startAddImage } from '../helpers/startAddImage';
import { confirmAction } from './action';
import { startLogout } from './auth';
import { startDeleteOldImage } from '../helpers/startDeleteOldImage';

export const startCheckingListProducts = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('product', {}, 'GET');
      const body = await resp.json();
      const products = body.products.map((p) => p);
      dispatch(checkingListProducts(products));
    } catch (error) {
      console.log(error);
    }
  };
};
export const checkingListProducts = (products) => ({
  type: types.productCheckingList,
  payload: products,
});

export const startAddNewProduct = (formValues, avatar) => {
  return async (dispatch) => {
    let product = {
      name: formValues.name,
      tradeMark: formValues.tradeMark,
      description: formValues.description,
      price: formValues.price,
      qty: formValues.qty,
      mediaUrl: formValues.mediaUrl,
    };
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    if (avatar) {
      product.mediaUrl = await dispatch(startAddImage(avatar));
    } else {
      product.mediaUrl =
        'https://res.cloudinary.com/dcqudzsce/image/upload/v1613417488/super_market/no-image.png';
    }
    try {
      const resp = await fetchConToken('product/new', product, 'POST');
      const body = await resp.json();
      if (body.ok) {
        product._id = body.product._id;
        product.code = body.product.code;
        dispatch(addNewProduct(product));
        dispatch(confirmAction());
        Swal.fire(
          'Acción confirmada',
          'Producto agregado con éxito',
          'success'
        );
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

export const addNewProduct = (product) => ({
  type: types.productAddNew,
  payload: product,
});

export const startUpdateProduct = (formValues, avatar) => {
  return async (dispatch) => {
    let product = {
      name: formValues.name,
      tradeMark: formValues.tradeMark,
      description: formValues.description,
      price: formValues.price,
      qty: formValues.qty,
      mediaUrl: formValues.mediaUrl,
    };
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    if (avatar) {
      if (
        product.mediaUrl !==
        'https://res.cloudinary.com/dcqudzsce/image/upload/v1613417488/super_market/no-image.png'
      ) {
        await dispatch(startDeleteOldImage(product.mediaUrl));
      }
      product.mediaUrl = await dispatch(startAddImage(avatar));
    }
    try {
      const resp = await fetchConToken(
        `product/${formValues._id}`,
        product,
        'PUT'
      );
      const body = await resp.json();
      if (body.ok) {
        dispatch(productUpdate(body.productResult));
        dispatch(confirmAction());
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
const productUpdate = (product) => ({
  type: types.productUpdated,
  payload: product,
});

export const startUpdateProductQty = (_id, qtyOrder, method) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`product/${_id}`, {}, 'GET');
      const body = await resp.json();
      if (body.ok) {
        let productUpdate = body.product;
        if (method === 'rest') {
          productUpdate.qty = parseInt(productUpdate.qty) - parseInt(qtyOrder);
        } else if (method === 'add') {
          productUpdate.qty = parseInt(productUpdate.qty) + parseInt(qtyOrder);
        }
        dispatch(startUpdateProduct(productUpdate));
        Swal.close();
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

export const startDeleteProduct = (id) => {
  return async (dispatch, getState) => {
    const { products } = getState().products;
    const p = products.find((p) => p._id === id);
    try {
      Swal.fire({
        title: 'Uploading...',
        text: 'Please wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      if (
        p.mediaUrl !==
        'https://res.cloudinary.com/dcqudzsce/image/upload/v1613417488/super_market/no-image.png'
      ) {
        await dispatch(startDeleteOldImage(p.mediaUrl));
      }
      const resp = await fetchConToken(`product/${id}`, {}, 'Delete');
      const body = await resp.json();
      if (body.ok) {
        dispatch(productDelete(id));
        dispatch(confirmAction());
        Swal.close();
        Swal.fire(
          'Acción confirmada',
          'Producto eliminado con éxito',
          'success'
        );
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

export const productDelete = (id) => ({
  type: types.productDeleted,
  payload: id,
});
