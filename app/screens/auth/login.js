import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TextInput, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { width, height } from 'react-native-dimension';
import images from '../../const/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from "react-native-modal";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/user';
import * as shareActions from '../../actions/shareContent';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userActive: false,
            passwordActive: false,
            isModalVisible: false,
            emailActive: false,
            resetPassActive: false,
            email: 'sergeypt423@gmail.com',
            password: 'rladlfgur',
            loading: false
        };
    }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    onLogin = () => {
        const { email, password } = this.state;
        if (email === '' || password === '') {
            alert('Email or Password can\'t be blank' );
            return;
        }
        const { loginRequest, getAllItems } = this.props;
        this.setState({ loading: true });

        loginRequest(email, password).then(() => {
            getAllItems(this.props);
            this.props.screenProps.rootNavigation.goBack();
            this.setState({ loading: false });
        }).catch(err => {
            alert(err);
            this.setState({ loading: false });
        })
    }

    render() {
        const { email, password, loading } = this.state;

        return (
            <View
                style={styles.container}>

                <View
                    style={styles.logoContainer}>
                    <Image
                        source={images.logo}
                        style={styles.logo}
                        resizeMode='contain'
                    />
                </View>

                <View
                    style={styles.inputContainer}>
                    <KeyboardAwareScrollView
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        scrollEnabled={false}
                        behavior="padding"
                        enabled>
                        <View style={[styles.inputSection, { borderColor: this.state.userActive === true ? '#00bcd4' : '#cccccc' }]}>
                            <Icon style={[styles.userIcon, { color: this.state.userActive === true ? '#00bcd4' : '#999999' }]} name="user" size={20} />
                            <TextInput
                                style={[styles.inputBox]}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCapitalize='none'
                                placeholder="Email"
                                placeholderTextColor={this.state.userActive === true ? '#00bcd4' : '#999999'}
                                onFocus={() => this.setState({ userActive: true })}
                                onBlur={() => this.setState({ userActive: false })}
                                value={email}
                                onChangeText={e => this.setState({ email: e })}
                            />
                        </View>

                        <View style={[styles.inputSection, { marginTop: height(1.5) }, { borderColor: this.state.passwordActive === true ? '#00bcd4' : '#cccccc' }]}>
                            <Icon style={[styles.userIcon, { color: this.state.passwordActive === true ? '#00bcd4' : '#999999' }]} name="lock" size={20} />
                            <TextInput
                                style={[styles.inputBox]}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                placeholder="Password"
                                autoCapitalize='none'
                                secureTextEntry={true}
                                placeholderTextColor={this.state.passwordActive === true ? '#00bcd4' : '#999999'}
                                onFocus={() => this.setState({ passwordActive: true })}
                                onBlur={() => this.setState({ passwordActive: false })}
                                value={password}
                                onChangeText={e => this.setState({ password: e })}
                            />
                        </View>

                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <View style={{flex: 1}} />
                            <TouchableOpacity style={styles.forgotPasswordButton} onPress={this._toggleModal}>
                                <Text
                                    style={styles.forgotPassword}
                                    >
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.button} onPress={this.onLogin}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text
                                style={[styles.normalText, { marginTop: height(2) }]}>
                                Do Not Have An Account?
                            </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AUTH_SIGNUP')}>
                                <Text
                                    style={[styles.normalText, { marginTop: height(2), fontWeight: 'bold', color: '#00bcd4' }]}>
                                    &nbsp;SIGNUP
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </KeyboardAwareScrollView>

                    <View
                        style={{ paddingBottom: height(3) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text
                                style={[styles.normalText, { marginTop: height(5) }]}>
                                By signing in you agree to Boxroom`s
                            </Text>
                            <TouchableOpacity>
                                <Text
                                    style={[styles.normalText, { marginTop: height(5), fontWeight: 'bold' }]}>
                                    &nbsp;Terms of Services
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text
                                style={[styles.normalText, { marginTop: height(0.5) }]}>
                                and
                            </Text>
                            <TouchableOpacity>
                                <Text
                                    style={[styles.normalText, { marginTop: height(0.5), fontWeight: 'bold' }]}>
                                    &nbsp;Privacy Policy
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View>
                    <Modal
                        isVisible={this.state.isModalVisible}
                        onBackdropPress={() => {this.setState({ isModalVisible: false })}}
                        style={styles.bottomModal}
                    >
                        <View>
                            {!this.state.resetPassActive ?
                                <View>
                                    <Text
                                        style={styles.titleText}>
                                        F O R G O T   P A S S W O R D
                                    </Text>
                                    <View style={[styles.modalInputSection, { flexDirection: 'row', borderColor: this.state.emailActive === true ? '#00bcd4' : '#cccccc', alignItems: 'center' }]}>
                                        <Icon style={[styles.userIcon, { color: this.state.emailActive === true ? '#00bcd4' : '#999999' }]} name="envelope" size={20} />
                                        <TextInput
                                            style={[styles.modealInputBox]}
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                            placeholder="Email"
                                            autoCapitalize='none'
                                            placeholderTextColor={this.state.emailActive === true ? '#00bcd4' : '#999999'}
                                            onFocus={() => this.setState({ emailActive: true })}
                                            onBlur={() => this.setState({ emailActive: false })}
                                        />
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        // this._toggleModal()
                                        this.setState({ resetPassActive: true })
                                    }}>
                                        <Image
                                            source={images.resetpass_but}
                                            resizeMode='contain'
                                            style={styles.modalButton}
                                        />
                                    </TouchableOpacity>
                                </View> :
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        source={images.confirm_img}
                                        resizeMode='contain'
                                        style={{ width: width(10), height: width(10) }}
                                    >
                                    </Image>
                                    <Text
                                        style={{ marginTop: height(3), fontWeight: 'bold', fontSize: 20 }}>
                                        Email has been Sent.
                                    </Text>
                                    <Text
                                        style={{ marginTop: height(2), color: '#999999' }}>
                                        Please find password reset link in mail you received.
                                    </Text>
                                    <TouchableOpacity onPress={() => {
                                        this._toggleModal()
                                        this.setState({ resetPassActive: false })
                                    }}>
                                        <Image
                                            source={images.backlogin_but}
                                            resizeMode='contain'
                                            style={styles.modalButton}
                                        />
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </Modal>
                </View>

                {
                    loading ?
                        <View style={styles.loadingView}>
                            <ActivityIndicator size='large' />
                        </View>
                        : null
                }
            </View>

        )
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    titleText: {
        // marginVertical: height(2),
        ...Platform.select({
            ios: {
                fontSize: 17,
                marginVertical: height(5),
            },
            android: {
                fontSize: 20,
                marginBottom: height(5),
            },
        }),
        // color: 'rgba(0,0,0,1)',

        color: '#00bcd4',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    bottomModal: {
        // flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: height(40),
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 0,
        padding: 0,
        width: width(100),
    },

    logoContainer: {
        flex: 0.5,
        alignItems: 'center',
        marginTop: height(10),
    },
    logo: {
        justifyContent: 'center',
        width: width(100),
        height: height(22.5),
    },

    inputContainer: {
        flex: 1,
        paddingTop: height(5),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green'
    },

    modalInputSection: {
        width: width(85),
        height: height(7),
        borderRadius: 10,
        borderWidth: 1,
        // borderColor: 'rgba(0,255,0,1)',
        borderColor: '#cccccc',
        backgroundColor: '#fbfbfb',
        // ...Platform.select({
        //     ios: {
        //         marginBottom:height(0),
        //     },
        //     android: {
        //         marginBottom:height(2.5),
        //     },
        // }),
    },

    inputSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        // borderColor: 'rgba(0,255,0,1)',
        borderColor: '#cccccc',
        backgroundColor: '#fbfbfb',
    },

    userIcon: {
        padding: 10,
    },

    modealInputBox: {
        flex: 1,
        ...Platform.select({
            ios: {
                height: height(7),
                fontSize: 14,
            },
            android: {
                fontSize: 14,
                height: height(7),

            },
        }),
        // backgroundColor: 'rgba(255,0,0,1)',
        paddingHorizontal: 16,
        color: '#999999',
        // marginVertical: height(1.5),
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
    },

    inputBox: {
        flex: 1,
        width: width(85),
        ...Platform.select({
            ios: {
                height: height(7),
                fontSize: 14,
            },
            android: {
                fontSize: 14,
                height: height(7),

            },
        }),
        // backgroundColor: 'rgba(255,0,0,1)',

        paddingHorizontal: 16,
        color: '#999999',
        // marginVertical: height(1.5),
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,

    },


    button: {
        width: width(85),
        height: width(12.5),
        backgroundColor: '#26AFCA',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                marginTop: height(5),
            },
            android: {
                marginTop: height(2.5),
            },
        }),
    },

    buttonText: {
        ...Platform.select({
            ios: {
                fontSize: 18,
            },
            android: {
                fontSize: 20,
            },
        }),
        fontWeight: 'bold',
        color: 'white'
    },

    modalButton: {
        width: width(85),
        height: height(10),
        marginTop: height(2.5),
        // ...Platform.select({
        //     ios: {
        //       marginTop: height(5),
        //     },
        //     android: {
        //         marginTop: height(2.5),
        //     },
        // }),
    },

    forgotPasswordButton: {
        ...Platform.select({
            ios: {
                marginVertical: height(2.5),
            },
            android: {
                marginVertical: height(1.5),
            },
        }),
    },

    forgotPassword: {
        ...Platform.select({
            ios: {
                fontSize: 12,
            },
            android: {
                fontSize: 14,
            },
        }),
        fontWeight: 'bold',
        color: '#999999',
        alignSelf: 'flex-end',
    },
    normalText: {
        // marginVertical: height(2),
        ...Platform.select({
            ios: {
                fontSize: 12,
            },
            android: {
                fontSize: 14,
            },
        }),
        // color: 'rgba(0,0,0,1)',
        color: '#999999',
        alignSelf: 'center',
    },
    loadingView: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#0005',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...authActions,
        ...shareActions
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginScreen);