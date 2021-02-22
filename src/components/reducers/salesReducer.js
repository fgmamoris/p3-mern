import { types } from '../../types/types';

const initialState = {
  sales: [],
};

export const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.saleCheckingList:
      return {
        ...state,
        sales: action.payload,
      };
    case types.saleNew:
      return {
        ...state,
        sales: [...state.sales, action.payload],
      };
    case types.saleChangeState:
      return {
        ...state,
        sales: state.sales.map((sale) =>
          sale._id === action.payload._id ? action.payload : sale
        ),
      };
    default:
      return state;
  }
};
