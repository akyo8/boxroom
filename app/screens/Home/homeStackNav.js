import { StackNavigator } from 'react-navigation';

import HomeScreen from './homeScreen';
import SelectScreen from './selectScreen';
import ReceiveScreen from './receiveScreen';
import ConnectScreen from './connectScreen';
import ShareContentScreen from '../ShareContent';
import VideoDetailScreen from '../Videos/videoDetailScreen';
import ShareFileScreen from '../Common/shareScreen';
import {transitionConfig} from '../../const/constData';

export default HomeStackNav = StackNavigator({
    HOME_MAIN: {
        screen: HomeScreen,
    },
    SELECT_FILES: {
        screen: SelectScreen,
        navigationOptions: {
            tabBarVisible: false,
        },
    },
    RECEIVE_FILES: {
        screen: ReceiveScreen,
        navigationOptions: {
            tabBarVisible: false,
        },
    },
    CONNECT: {
        screen: ConnectScreen,
        navigationOptions: {
            tabBarVisible: false,
        },
    },
    VIDEO_DETAIL: {
        screen: VideoDetailScreen,
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
