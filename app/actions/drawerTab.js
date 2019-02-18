import * as types from '../const/types';

export const selectDrawerTab = (item) => {
    return (dispatch) => {
        dispatch({
            type: types.SELECT_DRAWER_ITEM,
            payload: item
        })
    }
}