import { combineReducers } from 'redux';
import { actionReducer } from './actionReducer';
import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';
import { productReducer } from './productReducer';
import { salesReducer } from './salesReducer';
import { usersReducer } from './usersReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  products: productReducer,
  action: actionReducer,
  cart: cartReducer,
  sales: salesReducer,
});
