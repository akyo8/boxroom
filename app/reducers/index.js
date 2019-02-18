import { combineReducers } from 'redux';
import user from './user';
import shareContent from './shareContent';
import remoteData from './remoteData';
import selected from './send';
import drawerTab from './drawerTab';

export default combineReducers({
  user,
  selected,
  shareContent,
  remoteData,
  drawerTab
});