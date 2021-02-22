import Swal from 'sweetalert2';

import { types } from '../../types/types';
import { fetchConToken } from '../helpers/fetch';
import { confirmAction } from './action';
import { startLogout } from './auth';
import { startAddImage } from '../helpers/startAddImage';
import { startDeleteOldImage } from '../helpers/startDeleteOldImage';

export const userStartCheckingList = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('user', {});
      const body = await resp.json();
      const users = body.users.map((u) => u);
      dispatch(userCheckingList(users));
    } catch (error) {
      console.log(error);
    }
  };
};
export const userCheckingList = (users) => ({
  type: types.userCheckingList,
  payload: users,
});

export const startAddNewUser = (formValues, avatar) => {
  return async (dispatch) => {
    let user = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      employeePosition: formValues.employeePosition,
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
      user.mediaUrl = await dispatch(startAddImage(avatar));
    } else {
      user.mediaUrl =
        'https://res.cloudinary.com/dcqudzsce/image/upload/v1613417488/super_market/no-image.png';
    }
    try {
      const resp = await fetchConToken('user/new', user, 'POST');
      const body = await resp.json();
      if (body.ok) {
        user._id = body.uid;
        dispatch(addNewUser(user));
        dispatch(confirmAction());
        //Swal.close();
        Swal.fire('Acción confirmada', 'Usuario agregado con éxito', 'success');
      } else if (body.msg === 'Email already registered') {
        Swal.fire('Error', body.msg, 'error');
      } else if (body.msg === 'Token invalid') {
        dispatch(startLogout());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNewUser = (user) => ({
  type: types.userAddNew,
  payload: user,
});

export const startUpdateUser = (formValues, avatar) => {
  return async (dispatch) => {
    let user = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      employeePosition: formValues.employeePosition,
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
        user.mediaUrl !==
        'https://res.cloudinary.com/dcqudzsce/image/upload/v1613417488/super_market/no-image.png'
      ) {
        await dispatch(startDeleteOldImage(user.mediaUrl));
      }
      user.mediaUrl = await dispatch(startAddImage(avatar));
    }
    try {
      const resp = await fetchConToken(`user/${formValues._id}`, user, 'PUT');
      const body = await resp.json();
      if (body.ok) {
        dispatch(userUpdated(body.user));
        dispatch(confirmAction());
        Swal.fire(
          'Acción confirmada',
          'Usuario modificado con éxito',
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
    //Swal.close();
  };
};
const userUpdated = (user) => ({
  type: types.userUpdated,
  payload: user,
});

export const startDeleteUser = (id) => {
  return async (dispatch, getState) => {
    const { users } = getState().users;
    const u = users.find((u) => u._id === id);
    try {
      Swal.fire({
        title: 'Uploading...',
        text: 'Please wait...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      if (
        u.mediaUrl !==
        'https://res.cloudinary.com/dcqudzsce/image/upload/v1613417488/super_market/no-image.png'
      ) {
        await dispatch(startDeleteOldImage(u.mediaUrl));
      }
      const resp = await fetchConToken(`user/${id}`, {}, 'DELETE');
      const body = await resp.json();
      if (body.ok) {
        dispatch(userDeleted(id));
        dispatch(confirmAction());
        Swal.close();
        Swal.fire(
          'Acción confirmada',
          'Usuario eliminado con éxito',
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

export const userDeleted = (id) => ({
  type: types.userDeleted,
  payload: id,
});
