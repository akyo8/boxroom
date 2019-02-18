import * as types from '../const/types';

const initialState = {
  currentDrawer: 'Home'
};

export default drawerTab = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_DRAWER_ITEM:
      return {...state, currentDrawer: action.payload};
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
