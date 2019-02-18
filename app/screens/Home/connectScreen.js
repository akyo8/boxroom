import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Animated, NativeModules, PermissionsAndroid } from 'react-native';
import { width, height } from 'react-native-dimension';
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

import { connect as reduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavBar from '../Common/navBar';
import MyButton from '../Common/myButton';
import images from '../../const/images';
import wifi from 'react-native-android-wifi';
const { DeviceManager } = NativeModules;

import * as Util from '../../const/convert';

class RippleAnim extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: this.props.size,
                    height: this.props.size,
                    borderRadius: this.props.size / 2,
                    backgroundColor: this.props.color,
                    opacity: this.props.opacity,
                    transform: [
                        {
                            scale: this.props.scale,
                        }
                    ],
                }}
            />
        )
    }
}

class RippleAnimSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animTimer: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.state.animTimer, {
                toValue: this.props.duration,
                duration: this.props.duration,
            }),
        ).start();
    }

    render() {
        return (
            new Array(this.props.count).fill(null).map((item, idx) => {
                let timer = Animated.add(this.state.animTimer, Animated.multiply(new Animated.Value(400), new Animated.Value(-idx)));
                return (
                    <RippleAnim
                        key={idx}
                        index={idx}
                        size={this.props.size}
                        color='white'
                        opacity={timer.interpolate({
                            inputRange: [-this.props.duration, -101, -100, 2000, 2001, this.props.duration],
                            outputRange: [0, 0, 0.5, 0, 0, 0],
                            // extrapolate: 'clamp',
                        })}
                        scale={timer.interpolate({
                            inputRange: [-this.props.duration, -101, -100, 2000, 2001, this.props.duration],
                            outputRange: [0, 0, 0, 1, 0, 0],
                            // extrapolate: 'clamp',
                        })}
                    />
                )
            })
        )
    }
}

class ConnectScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animated: true,
            retry: false,
            hotspotList: [],
            centerX: 0,
            centerY: 0,
            prevSSID: '',
            sending: true,
        };
        this.onStartRippleAnim();
        // this.searchNearbyDevices();
        // this.refreshInterval = setInterval(() => {
        //     this.searchNearbyDevices();
        // }, 1000);
    }

    componentDidMount() {
        this.initializeApp();
    }

    componentWillUnmount() {
        this.finalizeApp();
    }

    initializeApp() {
        initialize();
        isSuccessfulInitialize()
            .then(status => {

            });
        startDiscoveringPeers()
            .then(() => console.log('Sucessfull'))
            .catch(err => console.log(err));

        subscribeOnPeersUpdates(({ devices }) => this.handleNewPeers(devices));
        subscribeOnConnectionInfoUpdates(this.handleNewInfo);
    }

    finalizeApp() {
        unsubscribeFromConnectionInfoUpdates((event) => console.log('unsubscribeFromConnectionInfoUpdates', event));
        unsubscribeFromPeersUpdates((event) => console.log('unsubscribeFromPeersUpdates', event));
        stopDiscoveringPeers();
    }

    handleNewInfo = (info, sceondParam) => {
        console.log(64646776467, info);
    };

    handleNewPeers = (peers) => {
        console.log(754862162442324, peers);
        this.setState({ hotspotList: peers });
    };

    onStartRippleAnim() {
        this.setState({
            animated: true,
            retry: false,
        });

        // setTimeout(() => {
        //     this.setState({
        //         animated: false,
        //         retry: true,
        //     });
        // }, 30000);
    }

    searchNearbyDevices() {
        const hotspotList = [];
        wifi.reScanAndLoadWifiList((wifiStringList) => {
            let wifiArray = JSON.parse(wifiStringList);
            wifiArray.map((wifi) => {
                if (Util.isBoxroomSSID(wifi.SSID)) {
                    hotspotList.push(wifi);
                }
            })
            this.setState({ hotspotList })
        }, (error) => {
            console.log(error);
        });
    }

    connectToHotspot(hotspot) {
        connect(hotspot.deviceAddress)
            .then(() => {
                console.log('Successfully connected');
                this.setState({ sending: false });
            })
            .catch(err => console.error('Something gone wrong. Details: ', err));
    }

    sendSubFile(uri) {
        return sendFile(uri)
            .then(() => console.log('File sent successfully'))
            .catch(err => console.log('Error while file sending', err));
    }

    sendFile() {
        if (this.state.sending === true) {
            return;
        }
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                'title': 'Access to read',
                'message': 'READ_EXTERNAL_STORAGE'
            }
        )
            .then(granted => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use read operation")
                } else {
                    console.log("Read operation permission denied")
                }
            })
            .then(() => {
                return PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        'title': 'Access to write',
                        'message': 'WRITE_EXTERNAL_STORAGE'
                    }
                )
            })
            .then(async () => {
                this.setState({ sending: true });
                const info = await getConnectionInfo();
                if (info.isGroupOwner) {
                    await removeGroup();
                    await disconnect();
                    this.setState({ sending: false });
                    this.finalizeApp();
                    this.initializeApp();
                    return;
                }

                if (getAvailablePeers().length > 0) {
                    setTimeout(() => {
                        let timeouts = 0;
                        let totalTimeouts = 0;
                        for (let i = 0; i < this.props.selected.length; i += 1) {
                            let item = this.props.selected[i];
                            setTimeout(() => {
                                this.sendSubFile(item.image.uri.substring(7));
                            }, timeouts);
                            timeouts = item.exactSize / 500;
                            totalTimeouts += timeouts;
                        }
                        setTimeout(() => {
                            this.setState({ sending: false });
                        }, totalTimeouts);
                    }, 2000);
                } else {
                    this.setState({ sending: false });
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const { hotspotList, centerX, centerY, prevSSID } = this.state;
        const radius = width(28);

        return (
            <View style={styles.container}>
                <NavBar
                    title=''
                    onBackPress={() => {
                        wifi.findAndConnect(prevSSID, "", (found) => {
                            if (found) {
                            } else {
                            }
                            this.props.navigation.goBack()
                        })
                    }}
                    onLogoPress={() => { }}
                />

                {
                    this.state.animated ? (
                        <View style={styles.animContainer}>
                            <RippleAnimSet
                                size={width(100)}
                                duration={5000}
                                count={8}
                            />

                            <View
                                style={styles.retryButtonContainer}
                                onLayout={e => {
                                    const { x, y, width, height } = e.nativeEvent.layout;
                                    const cX = x + width / 2;
                                    const cY = y + height / 2;
                                    this.setState({ centerX: cX, centerY: cY });
                                }}
                            >
                                <Image
                                    source={images.image_connect_wifi}
                                    style={{
                                        resizeMode: 'contain',
                                        width: 60,
                                        height: 60,
                                    }}
                                />
                            </View>
                            {
                                hotspotList.map((hotspot, idx) => {
                                    const angle = 45 + 360 / hotspotList.length * idx;
                                    const rad = angle * 3.14 / 180;
                                    const dx = -radius * Math.cos(rad);
                                    const dy = -radius * Math.sin(rad);
                                    const x = centerX + dx;
                                    const y = centerY + dy;
                                    return (
                                        <TouchableOpacity
                                            style={[styles.phoneImageContent, { top: y - 30, left: x - 35 }]}
                                            activeOpacity={0.9}
                                            onPress={() => this.connectToHotspot(hotspot)}
                                        >
                                            <Image
                                                source={images.image_connect_phone}
                                                style={styles.phoneImage}
                                            />
                                            <Text style={styles.phoneName}>{Util.getIDFromSSID(hotspot.deviceAddress)}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    ) : null
                }

                {
                    this.state.retry ? (
                        <View style={styles.animContainer}>
                            <View style={{
                                position: 'absolute',
                                width: '100%',
                                height: 200,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}>
                                <Text style={{ fontSize: 20, color: 'white' }}>
                                    Retry
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={this.onStartRippleAnim.bind(this)}
                                style={styles.retryButtonContainer}
                            >
                                <Image
                                    source={images.image_connect_retry}
                                    style={{
                                        resizeMode: 'contain',
                                        width: 60,
                                        height: 60,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : null
                }
                <View style={styles.buttonContainer}>
                    <View style={[styles.buttonContent, { justifyContent: 'flex-end' }]}>
                        <MyButton
                            width='47%'
                            onPress={() => this.sendFile()}
                            borderColor='white'
                            fillColor='#00bcd4'
                            textColor='white'
                            text='Send File(s)'
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.buttonContent}>
                        <MyButton
                            width='47%'
                            borderColor='white'
                            fillColor='#00bcd4'
                            textColor='white'
                            text='Connect to iOS'
                        />

                        <MyButton
                            width='47%'
                            borderColor='white'
                            fillColor='#00bcd4'
                            textColor='white'
                            text='Connect to PC'
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selected: state.selected
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
}

export default reduxConnect(mapStateToProps, mapDispatchToProps)(ConnectScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00bcd4',
    },
    buttonContainer: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
    },
    animContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContent: {
        width: '90%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderWidth: 1,
    },
    retryButtonContainer: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 1, height: 1, },
        backgroundColor: '#005964',
        justifyContent: 'center',
        alignItems: 'center',
    },
    phoneImageContent: {
        position: 'absolute',
        alignItems: 'center',
    },
    phoneImage: {
        width: 45,
        height: 45
    },
    phoneName: {
        fontSize: 15,
    }
})
