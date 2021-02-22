import { types } from '../../types/types';

const initialState = {
  users: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.userCheckingList:
      return {
        ...state,
        users: action.payload,
      };
    case types.userAddNew:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case types.userUpdated:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case types.userDeleted:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
      
    default:
      return state;
  }
};
