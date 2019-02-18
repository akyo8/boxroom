//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, NativeModules, Button, PermissionsAndroid } from 'react-native';
const { DeviceManager } = NativeModules;
import DeviceInfo from 'react-native-device-info';
import {
    initialize,
    isSuccessfulInitialize,
    startDiscoveringPeers,
    stopDiscoveringPeers,
    unsubscribeFromPeersUpdates,
    unsubscribeFromConnectionInfoUpdates,
    subscribeOnConnectionInfoUpdates,
    subscribeOnPeersUpdates,
    connect,
    disconnect,
    createGroup,
    removeGroup,
    getAvailablePeers,
    sendFile,
    receiveFile,
    getConnectionInfo
} from 'react-native-wifi-p2p';
import * as Util from '../../const/convert';

// create a component
class ReceiveScreen extends Component {
    constructor() {
        super();

        this.state = {
            devices: []
        }
    }

    componentWillMount() {
        let id = Util.getIDFromModel(DeviceInfo.getModel());
        DeviceManager.enableTether(Util.getSSIDFromID(id));
    }

    componentDidMount() {
        initialize();
        isSuccessfulInitialize()
            .then(status => console.log(status));
        startDiscoveringPeers()
            .then(() => console.log('Sucessfull'))
            .catch(err => console.log(err));

        subscribeOnPeersUpdates(({ devices }) => this.handleNewPeers(devices));
        subscribeOnConnectionInfoUpdates(this.handleNewInfo);
        this.receiver = setInterval(() => {
            this.onReceiveFile();
        }, 500);
    }

    componentWillUnmount() {
        unsubscribeFromConnectionInfoUpdates((event) => console.log('unsubscribeFromConnectionInfoUpdates', event));
        unsubscribeFromPeersUpdates((event) => console.log('unsubscribeFromPeersUpdates', event));
        clearInterval(this.receiver)
    }

    handleNewInfo = (info, sceondParam) => {
        console.log(64646776467, info);
    };

    handleNewPeers = (peers) => {
        console.log(754862162442324, peers);
        this.setState({ devices: peers });
    };

    onReceiveFile = () => {
        receiveFile()
            .then(() => console.log('File received successfully'))
            .catch(err => console.log('Error while file receiving', err))
    };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="Receive file"
                    onPress={this.onReceiveFile}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

//make this component available to the app
export default ReceiveScreen;
