import { StackNavigator } from 'react-navigation';

import ShareContentScreen from '../ShareContent';
import ShareFileScreen from '../Common/shareScreen';
import OthersScreen from './othersScreen';
import OthersDetailScreen from './othersDetailScreen';
import DocumentDetailScreen from './documentDetailScreen';
import PictureDetailScreen from '../Pictures/pictureDetailScreen';
import VideoDetailScreen from '../Videos/videoDetailScreen';
import {transitionConfig} from '../../const/constData';

export default OthersStackNav = StackNavigator({
    OTHERS_HOME: {
        screen: OthersScreen
    },
    OTHERS_DETAIL: {
        screen: OthersDetailScreen
    },
    OTHER_PICTURE_DETAIL: {
        screen: PictureDetailScreen,
        navigationOptions: {
            tabBarVisible: false,
        },
    },
    OTHER_VIDEO_DETAIL: {
        screen: VideoDetailScreen,
        navigationOptions: {
            tabBarVisible: false,
        },
    },
    OTHER_DOCUMENT_DETAIL: {
        screen: DocumentDetailScreen,
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
