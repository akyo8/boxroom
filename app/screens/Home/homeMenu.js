import React, { Component } from 'react';
import {  View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import images from '../../const/images';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectDrawerTab } from '../../actions/drawerTab';
import { logoutSuccess } from '../../actions/user';

class HomeMenuScreen extends Component {
    constructor(props) {
        super(props);
    }

    navigateToScreen = (route) => {
        this.props.selectDrawerTab(route);
        this.props.navigation.navigate('DrawerClose');
    };

    logout = () => {
        this.props.logoutSuccess();
        // this.props.screenProps.rootNavigation.dispatch(NavigationActions.reset({
        //         index: 0,
        //         actions: [
        //             NavigationActions.navigate({
        //                 routeName: 'AUTH_NAV',
        //                 key: 'AUTH_NAV',
        //             })
        //         ]
        //     })
        // );
    };

    render() {
        const { user, drawerTab } = this.props;
        const { index } = this.props.navigation.state;
        const isHome = drawerTab.currentDrawer === 'Home';
        const isTrending = drawerTab.currentDrawer === 'Trending';
        const isSubscription = drawerTab.currentDrawer === 'Subscriptions';
        const isHistory = drawerTab.currentDrawer === 'History';
        const isLiked = drawerTab.currentDrawer === 'Liked';

        return (
            <View style={styles.container}>
                <View style={styles.userInfoContainer}>
                    <View style={styles.photoView}>
                        <Image source={images.photo} style={styles.photo} resizeMode='contain'/>
                    </View>
                    <Text style={styles.email}>{user.user_name}</Text>
                </View>
                <View style={styles.buttonListContainer}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => this.navigateToScreen('Home')}
                    >
                        <Image source={isHome ? images.home_active : images.home_inactive} style={styles.menuButtonIcon} resizeMode='contain' />
                        <Text style={[styles.menuButtonText, {color: isHome ? '#00bcd4' : '#aaa'}]}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => this.navigateToScreen('Trending')}
                    >
                        <Image source={isTrending ? images.trending_active : images.trending_inactive} style={styles.menuButtonIcon} resizeMode='contain' />
                        <Text style={[styles.menuButtonText, {color: isTrending ? '#00bcd4' : '#aaa'}]}>Trending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => this.navigateToScreen('Subscriptions')}
                    >
                        <Image source={isSubscription ? images.subscription_active : images.subscription_inactive} style={styles.menuButtonIcon} resizeMode='contain' />
                        <Text style={[styles.menuButtonText, {color: isSubscription ? '#00bcd4' : '#aaa'}]}>Subscription</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => this.navigateToScreen('History')}
                    >
                        <Image source={isHistory ? images.history_active : images.history_inactive} style={styles.menuButtonIcon} resizeMode='contain' />
                        <Text style={[styles.menuButtonText, {color: isHistory ? '#00bcd4' : '#aaa'}]}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => this.navigateToScreen('Liked')}
                    >
                        <Image source={isLiked ? images.liked_active : images.liked_inactive} style={styles.menuButtonIcon} resizeMode='contain' />
                        <Text style={[styles.menuButtonText, {color: isLiked ? '#00bcd4' : '#aaa'}]}>Liked</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.menuButton, {marginTop: 10}]}
                    onPress={() => this.logout()}
                >
                    <Image source={images.logout} style={styles.menuButtonIcon} resizeMode='contain' />
                    <Text style={[styles.menuButtonText, {color: '#aaa'}]}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoContainer: {
        width: '100%',
        height: 190,
        backgroundColor: '#00bcd4',
        alignItems: 'center',
        paddingTop: 50,
    },
    photoView: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: 'hidden',
        marginBottom: 25,
    },
    photo: {
        width: 70,
        height: 70,
        backgroundColor: 'white'
    },
    email: {
        fontSize: 16,
        color: 'white'
    },
    buttonListContainer: {
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    menuButton: {
        width: '100%',
        height: 53,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButtonIcon: {
        width: 22,
        height: 25,
        marginLeft: 20,
        marginRight: 30,
    },
    menuButtonText: {
        fontSize: 15,
    }
});

const mapStateToProps = function (state) {
    const { user, drawerTab } = state;
    return {
        user,
        drawerTab
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectDrawerTab,
        logoutSuccess
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeMenuScreen);
