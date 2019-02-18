import React, { Component } from 'react';
import { Image } from 'react-native';
import { TabNavigator, TabBarBottom, DrawerNavigator } from 'react-navigation';
import { width, height } from 'react-native-dimension';

import HomeStackNav from './Home/homeStackNav';
import VideoStackNav from './Videos/videoStackNav';
import MusicStackNav from './Music/musicStackNav';
import PictureStackNav from './Pictures/pictureStackNav';
import OthersStackNav from './Others/othersStackNav';
import HomeMenuScreen from './Home/homeMenu';
import images from '../const/images';

const TabNav = TabNavigator({
    HOME: {
        screen: HomeStackNav,
    },
    VIDEOS: {
        screen: VideoStackNav
    },
    MUSIC: {
        screen: MusicStackNav
    },
    PICTURES: {
        screen: PictureStackNav
    },
    OTHERS: {
        screen: OthersStackNav
    }
}, {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: '#00bcd4',
            style: {
                height: 55,
                borderTopWidth: 1
            },
            tabStyle: {
                padding: 7
            },
            labelStyle: {
                fontSize: 9
            }
        },
        initialRouteName: 'HOME',
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let icon;
                switch (routeName) {
                    case 'HOME':
                        icon = focused ? images.home_active : images.home_inactive;
                        break;
                    case 'VIDEOS':
                        icon = focused ? images.video_active : images.video_inactive;
                        break;
                    case 'MUSIC':
                        icon = focused ? images.music_active : images.music_inactive;
                        break;
                    case 'PICTURES':
                        icon = focused ? images.picture_active : images.picture_inactive;
                        break;
                    case 'OTHERS':
                        icon = focused ? images.others_active : images.others_inactive;
                        break;
                }

                return <Image source={icon} style={{ width: 25, height: 22 }} resizeMode='contain' />
            },
        })
    }
);

class NestedTabNavigatorWrapper extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TabNav screenProps={{ rootNavigation: this.props.navigation, screenProps: this.props.screenProps }} />
        );
    }
}

const DrawerNav = DrawerNavigator({
    First: {
        screen: NestedTabNavigatorWrapper
    }
},  {
    headerMode: 'none',
    drawerWidth: width(90),
    drawerLockMode: 'locked-closed',
    contentComponent: HomeMenuScreen
});

class NestedDrawerNavigatorWrapper extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <DrawerNav screenProps={{ rootNavigation: this.props.navigation }} />
        );
    }
}

export default NestedDrawerNavigatorWrapper;