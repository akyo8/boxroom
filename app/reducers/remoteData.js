import * as types from '../const/types';

const initialState = [];

export default remoteData = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_ITEMS:
      return action.item;
    default:
      return state;
  }
}
