import { StackNavigator } from 'react-navigation';

import ShareContentScreen from '../ShareContent';
import ShareFileScreen from '../Common/shareScreen';
import VideoScreen from './videoScreen';
import VideoDetailScreen from './videoDetailScreen';
import {transitionConfig} from '../../const/constData';
import VideoPlayerScreen from './videoPlayerScreen';

export default VideoStackNav = StackNavigator({
    VIDEO_HOME: {
        screen: VideoScreen
    },
    VIDEO_DETAIL: {
        screen: VideoDetailScreen,
        navigationOptions: {
            tabBarVisible: false,
        },
    },
    VIDEO_PLAYER: {
        screen: VideoPlayerScreen,
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