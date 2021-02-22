import { types } from '../../types/types';

const initialState = {
  user: '',
  products: [],
  _id: '',
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.cartChecking:
      return {
        ...state,
        ...action.payload,
      };
    case types.updateCart:
      return {
        ...state,
        cart: state.cart.map((cart) =>
          cart._id === action.payload._id ? action.payload : cart
        ),
      };

    case types.cartDeleted:
      return {
        ...state,
        user: '',
        products: [],
        _id: '',
      };
    default:
      return state;
  }
};
