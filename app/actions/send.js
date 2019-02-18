import * as types from '../const/types';

export const selectItem = (item, select) => {
    return (dispatch) => {
        dispatch({
            type: select ? types.SELECT_ITEM : types.UNSELECT_ITEM,
            item
        })
    }
}

export const selectMultiItems = (items, select) => {
    return (dispatch) => {
        dispatch({
            type: select ? types.SELECT_MULTI_ITEMS : types.UNSELECT_MULTI_ITEMS,
            items
        })
    }
}