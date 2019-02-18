import { StackNavigator } from 'react-navigation';

import ShareContentScreen from '../ShareContent';
import ShareFileScreen from '../Common/shareScreen';
import MusicScreen from './musicScreen';
import MusicDetailScreen from './musicDetailScreen';
import {transitionConfig} from '../../const/constData';

export default MusicStackNav = StackNavigator({
    MUSIC_HOME: {
        screen: MusicScreen
    },
    MUSIC_DETAIL: {
        screen: MusicDetailScreen
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
    navigationOptions: {
        headerVisible: false,
        transitionConfig,
    }
});
