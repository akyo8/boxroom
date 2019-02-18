import { StackNavigator } from 'react-navigation';

import ShareContentScreen from '../ShareContent';
import ShareFileScreen from '../Common/shareScreen';
import PictureScreen from './pictureScreen';
import PictureDetailScreen from './pictureDetailScreen';
import {transitionConfig} from '../../const/constData';

export default PictureStackNav = StackNavigator({
    PICTURE_MAIN: {
        screen: PictureScreen,
    },
    PICTURE_DETAIL: {
        screen: PictureDetailScreen,
        navigationOptions: {
            tabBarVisible: false,
        },
    },
    ShareContentScreen: {
        screen: ShareContentScreen,
        navigationOptions: {
            tabBarVisible: false,
        },
    },
    ShareFileScreen: {
        screen: ShareFileScreen,
        navigationOptions: {
            tabBarVisible: false,
        },
    },
}, {
    headerMode: 'none',
    transitionConfig,
});
