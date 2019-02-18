import * as types from '../const/types';
import * as authApi from '../api/user';

export const loginRequest = (email, password) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      authApi.login(email, password).then((res) => res.json().then(json => {
        if (!json.errors) {
          resolve();
          dispatch(loginSuccess(json.user));
        } else {
          if (json.errors.email) {
            reject("Email can't be blank!");
          } else {
            reject("Password can't be blank!");
          }
        }
      }))
      .catch(err => {
        reject("Network Error");
      });
    })
  }
}

export const logoutSuccess = () => {
  return { type: types.LOGOUT };
}

export const loginSuccess = user => {
  return { type: types.LOGIN_SUCCESS, user };
}

export const signupRequest = (userName, fullName, email, phone, password) => {
  return (dispatch) => {
    alert(1)
    return new Promise((resolve, reject) => {
      authApi.signup(userName, fullName, email, phone, password).then(res => res.json().then(json => {
        if (!json.errors) {
          resolve();
        } else {
          if (json.errors.email) {
            reject('Email is already taken!');
          } else {
            reject('Phone number is already taken!');
          }
        }
      })).catch(err => reject("Network Error"))
    })
  }
}