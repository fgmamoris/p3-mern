/***
 * uid:
 * firstName:
 * employedPosition:
 * checking:true
 */

import { types } from '../../types/types';
const initialState = {
  checking: true,
  // uid: null,
  // name: null
  //position
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      /**
       * Devuelvo el state como esta, modifico cheking para indicar que ya no tiene que
       * checkear si el usuario esta logeado, por que ya fue verificado
       * y le paso el payload que traigo de la acción anterior
       * El checking en true solo lo utilizo cuando cargo la app y market router verifica
       * si el usuario esta logueado
       */
      return {
        ...state,
        checking: false,
        ...action.payload,
      };
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };
    case types.authLogout:
          return { checking: false};
    default:
      return state;
  }
};
