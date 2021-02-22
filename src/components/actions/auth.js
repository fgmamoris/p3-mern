import Swal from 'sweetalert2';

import { types } from '../../types/types';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { startCartCheking } from './cart';
import { startCheckingListProducts } from './product';
import { startSaleCheckingList } from './sale';
import { userStartCheckingList } from './user';
/* Necesito el return por ser una función asincrona, si no fuese asincorna
 * NO necesitaria el return, y esto es gracias a thunk
 */
export const startLogin = (email, password) => {
  return async (dispatch) => {
    //   //DEVUELVE UN CB, ejecuta y espera que se haga el dispatch, y recibe el dispatch desde el thunk
    //   //localStorage.setItem('user', JSON.stringify(user));
    //   /** sessionStorage.setItem("user", JSON.stringify(user));
    //    * Aca tengo que traer los datos de login, pasarlos al dispactch
    //    * y si da error generar el swal, y sino da el error entonces pasarselos al store
    //    *
    const resp = await fetchSinToken('auth/new', { email, password }, 'POST');
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          firstName: body.firstName,
          lastName: body.lastName,
          position: body.employeePosition,
        })
      );
      if (body.employeePosition === 'gerente') {
        dispatch(userStartCheckingList());
        dispatch(startSaleCheckingList());
      } else if (body.employeePosition === 'vendedor') {
        dispatch(startCartCheking());
      }
      dispatch(startCheckingListProducts());
    } else {
      Swal.fire('Error', body.msg, 'error');
    }
  };
};

export const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startChecking = () => {
  //Chequeo si hay un token guardado para saber si hay usuario logeado
  return async (dispatch) => {
    const resp = await fetchConToken('auth/renew');
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', Date());
      dispatch(
        login({
          uid: body.uid,
          firstName: body.firstName,
          lastName: body.lastName,
          position: body.employeePosition,
        })
      );
      console.log(body);
      if (body.employeePosition === 'gerente') {
        dispatch(userStartCheckingList());
        dispatch(startSaleCheckingList());
      } else if (body.employeePosition === 'vendedor') {
        dispatch(startCartCheking());
      }
      dispatch(startCheckingListProducts());
    } else if (body.msg === 'Token invalid') {
      dispatch(ckeckingFinish());
      dispatch(startLogout());
    } else {
      //Swal.fire('Error', body.msg, 'error');
      dispatch(ckeckingFinish());
    }
  };
};
const ckeckingFinish = () => ({
  type: types.authCheckingFinish,
});

export const startLogout = () => {
  return (dispatch, getState) => {
    localStorage.clear();
    dispatch(logout());
    Swal.fire('Error', 'Session cerrada', 'error');
  };
};

export const logout = () => ({
  type: types.authLogout,
});
