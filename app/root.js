import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { PermissionsAndroid } from 'react-native';
import SplashsScreen from './screens/splashScreen.js';
import AuthStackNav from './screens/auth/authStackNav';
import DrawerNav from './screens/main';
import {transitionConfig} from './const/constData';

import { loadAll } from './loadData';
import { bindActionCreators } from 'redux';
import * as authActions from './actions/user';
import * as shareActions from './actions/shareContent';

const MainStack = StackNavigator({
    TAB_NAV: {
        screen: DrawerNav
    },
    AUTH_NAV: {
        screen: AuthStackNav
    },
}, {
    headerMode: 'none',
    transitionConfig,
});

class Root extends Component{
    constructor(props){
        super(props);

        this.state = {
            showSplash : true,
        }

        // setTimeout(() => {
        //     this.setState({ showSplash: false });
        //   }, 2500);
    }

    async UNSAFE_componentWillMount() {
        await PermissionsAndroid.request('android.permission.READ_EXTERNAL_STORAGE');

        loadAll();
    }

    toAuthStack() {
        this.setState({showSplash: false});
        const { getAllItems } = this.props;
        getAllItems(this.props);
    }

    render(){
        const { showSplash, showAuth } = this.state;
        if (showSplash) {
            return <SplashsScreen onStartPress={this.toAuthStack.bind(this)} />;
        }
        return <MainStack />;
        
    }
}

const mapStateToProps = function (state) {
    return{
        isAuthenticated: true
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...authActions,
        ...shareActions
    }, dispatch)
}

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Root);
