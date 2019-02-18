import { NavigationActions } from 'react-navigation';
import * as types from '../const/types';
import * as shareApi from '../api/shareContent';

export const uploadContent = (data, item, props) => {
    return (dispatch) => {
        console.log(1);
        return new Promise((resolve, reject) => {
            console.log(2);
            shareApi.uploadContent(data, item).then((res) => res.json().then(json => {
                if (!json.errors) {
                    resolve();
                    props.navigation.goBack();
                } else {
                    console.log(json.errors);
                    if (json.errors.email) {
                        reject("Email can't be blank!");
                    } else {
                        reject("Password can't be blank!");
                    }
                }
                dispatch({ type: types.SELECT_SHARE_ITEM, item: null });
            }))
                .catch(err => {
                    console.log(err)
                    reject("Network Error");
                    dispatch({ type: types.SELECT_SHARE_ITEM, item: null });
                });
        })
    }
}

export const getAllItems = (props) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            shareApi.getAllItems().then((res) => res.json().then(json => {
                if (!json.errors) {
                    resolve();
                    dispatch({ type: types.GET_ALL_ITEMS, item: json.items });
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

export const selectShareItem = (item) => {
    return (dispatch) => {
        dispatch({
            type: types.SELECT_SHARE_ITEM,
            item
        })
    }
}