import Swal from 'sweetalert2';

import { types } from '../../types/types';
import { fetchConToken } from '../helpers/fetch';
import { confirmAction } from './action';
import { startLogout } from './auth';
import { startCartDelete } from './cart';

export const startSaleCheckingList = (uid) => {
  console.log('StartSale');
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('sale', {});
      const body = await resp.json();
      const sales = body.sales.map((s) => s);
      dispatch(saleCheking(sales));
    } catch (error) {
      console.log(error);
    }
  };
};
export const saleCheking = (sales) => ({
  type: types.saleCheckingList,
  payload: sales,
});

export const starNewSale = (sale) => {
  return async (dispatch, getState) => {
    Swal.fire({
      title: 'Processing payment',
      text: 'Please wait...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const { firstName, lastName } = getState().auth;
    const cart = getState().cart;
    const saleN = {
      seller: firstName + ' ' + lastName,
      products: sale.products,
      client: {
        fullName: sale.fullName,
        address: sale.address,
        email: sale.email ? sale.email : ' ',
      },
      paymentBreakdown: {
        paymentMethod: sale.paymentMethod,
        card: sale.card ? sale.card : 0,
        paidDate: sale.date,
      },
      totalAmount: sale.totalAmount,
      state: 'active',
    };

    if (saleN.paymentBreakdown.paymentMethod !== 'cash') {
      console.log(saleN.paymentBreakdown.paymentMethod);
      Swal.fire({
        title: 'Processing payment',
        text: 'Please wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
    }
    try {
      const resp = await fetchConToken('sale/new', saleN, 'POST');
      const body = await resp.json();
      if (body.ok) {
        sale._id = body.sale._id;
        dispatch(newSale(body.sale));
        dispatch(startCartDelete(cart._id));
        Swal.fire(
          'Venta confirmada',
          'Se ralizo operación con éxito',
          'success'
        );
        dispatch(confirmAction());
      } else if (body.msg === 'Token invalid') {
        dispatch(startLogout());
      } else {
        console.log(body);
        Swal.fire('Error', body.msg, 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const newSale = (sale) => ({
  type: types.saleNew,
  payload: sale,
});

export const starUpdateSale = (id) => {
  return async (dispatch) => {
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const resp = await fetchConToken(`sale/${id}`, {}, 'GET');
      const body = await resp.json();
      if (body.ok) {
        let sale = body.sale;
        sale.state = 'inactive';
        console.log(sale);
        try {
          const resp = await fetchConToken(`sale/${id}`, sale, 'PUT');
          const body = await resp.json();
          console.log(body);
          if (body.ok) {
            dispatch(startSaleChangeState(body.sale));
            dispatch(confirmAction());
            Swal.fire('Acción confirmada', 'Venta cancelada', 'success');
          } else if (body.msg === 'Token invalid') {
            dispatch(startLogout());
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const startSaleChangeState = (sale) => ({
  type: types.saleChangeState,
  payload: sale,
});
