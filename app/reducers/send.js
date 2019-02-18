import * as types from '../const/types';

const initialState = [];

const findInArray = (array, item) => {
  for (let index in array) {
    let _item = array[index];
    if (JSON.stringify(_item) === JSON.stringify(item)) {
      return index;
    }
  }
  return -1;
}

export default selected = (state = initialState, action) => {
  switch (action.type) {
    case types.SELECT_ITEM:
      state.push(action.item);
      return state.slice(0);
    case types.UNSELECT_ITEM:
      state.splice(state.indexOf(action.item), 1);
      return state.slice(0);
    case types.SELECT_MULTI_ITEMS:
      return [...state, ...action.items];
    case types.UNSELECT_MULTI_ITEMS:
      action.items.map(item => {
        state.splice(state.indexOf(item), 1);
      });
      return [...state];
    default:
      return state;
  }
}
