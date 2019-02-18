import * as types from '../const/types';

const initialState = {};

export default user = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.user;
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
