import { types } from '../../types/types';

const initialState = {
  action: false,
};

export const actionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.confirmAction:
      return {
        ...state,
        action: true,
      };
    case types.removeAction:
      return {
        ...state,
        action: false,
      };

    default:
      return state;
  }
};
