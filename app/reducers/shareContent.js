import * as types from '../const/types';

const initialState = null;

export default shareContent = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_SHARE_ITEM:
      return action.item;
    default:
      return state;
  }
}
