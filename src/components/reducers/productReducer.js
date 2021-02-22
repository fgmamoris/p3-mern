import { types } from '../../types/types';

const initialState = {
  products: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.productCheckingList:
      return {
        ...state,
        products: action.payload,
      };
    case types.productAddNew:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case types.productUpdated:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };

    case types.productUpdatedCartRestQty:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case types.productDeleted:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
