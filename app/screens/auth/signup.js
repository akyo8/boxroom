import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TextInput, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {width,height} from 'react-native-dimension';
import images from '../../const/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/user';

class SignUpScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstActive: false,
            lastActive: false,
            passwordActive: false,
            emailActive: false,
            phoneActive: false,
            userName: '',
            fullName: '',
            email: '',
            phone: '',
            password: ''
        };
    }

    onSignup = () => {
        const { userName, fullName, email, phone, password } = this.state;
        const { signupRequest } = this.props;
        if (!userName || !fullName || !email || !phone || !password) {
            alert('Fields should not be empty');
            return;
        }
        signupRequest(userName, fullName, email, phone, password).then(() => {
            alert('Sign Up Successful!');
            this.props.navigation.goBack();
        }).catch((err) => {
            alert(err)
        })
    }

    render(){
        const { userName, fullName, email, phone, password } = this.state;

        return(
            <View
                style={styles.inputContainer}>

                <KeyboardAwareScrollView  
                    resetScrollToCoords={{x : 0, y: 0}}
                    scrollEnabled={false}
                    behavior="padding" 
                    enabled>
                    <Text
                        style={styles.titleText}>
                        CREATE NEW ACCOUNT
                    </Text>

                    <View style={[styles.inputSection,{borderColor: this.state.firstActive === true ? '#00bcd4' : '#cccccc'}]}>
                        <Icon style={[styles.userIcon,{color: this.state.firstActive === true ? '#00bcd4' : '#999999'}]} name="user" size={20}/>
                        <TextInput 
                            style={styles.inputBox}
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder="Username"
                            placeholderTextColor={this.state.firstActive === true ? '#00bcd4' : '#999999'}
                            onFocus={() => this.setState({firstActive:true})}
                            onBlur={() => this.setState({firstActive:false})}
                            value={userName}
                            onChangeText={(e) => this.setState({userName: e})}
                            />
                    </View>

                    <View style={[styles.inputSection,{marginTop:height(3)}, {borderColor: this.state.lastActive === true ? '#00bcd4' : '#cccccc'}]}>
                        <Icon style={[styles.userIcon,{color: this.state.lastActive === true ? '#00bcd4' : '#999999'}]} name="user" size={20}/>
                        <TextInput 
                            style={[styles.inputBox]}
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder="Full Name"
                            placeholderTextColor={this.state.lastActive === true ? '#00bcd4' : '#999999'}
                            onFocus={() => this.setState({lastActive:true})}
                            onBlur={() => this.setState({lastActive:false})}
                            value={fullName}
                            onChangeText={(e) => this.setState({fullName: e})}
                            />
                    </View>

                    <View style={[styles.inputSection,{marginTop:height(3)}, {borderColor: this.state.emailActive === true ? '#00bcd4' : '#cccccc'}]}>
                        <Icon style={[styles.userIcon,{color: this.state.emailActive === true ? '#00bcd4' : '#999999'}]} name="envelope" size={20}/>
                        <TextInput 
                            style={[styles.inputBox]}
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder="Email"
                            autoCapitalize='none'
                            placeholderTextColor={this.state.emailActive === true ? '#00bcd4' : '#999999'}
                            onFocus={() => this.setState({emailActive:true})}
                            onBlur={() => this.setState({emailActive:false})}
                            value={email}
                            onChangeText={(e) => this.setState({email: e})}
                            />
                    </View>

                    <View style={[styles.inputSection,{marginTop:height(3)}, {borderColor: this.state.phoneActive === true ? '#00bcd4' : '#cccccc'}]}>
                        <Icon style={[styles.userIcon,{color: this.state.phoneActive === true ? '#00bcd4' : '#999999'}]} name="phone" size={20}/>
                        <TextInput 
                            style={[styles.inputBox]}
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder="Phone"
                            autoCapitalize='none'
                            placeholderTextColor={this.state.phoneActive === true ? '#00bcd4' : '#999999'}
                            onFocus={() => this.setState({phoneActive:true})}
                            onBlur={() => this.setState({phoneActive:false})}
                            value={phone}
                            onChangeText={(e) => this.setState({phone: e})}
                            />
                    </View>

                    <View style={[styles.inputSection,{marginTop:height(3)}, {borderColor: this.state.passwordActive === true ? '#00bcd4' : '#cccccc'}]}>
                        <Icon style={[styles.userIcon,{color: this.state.passwordActive === true ? '#00bcd4' : '#999999'}]} name="lock" size={20}/>
                        <TextInput 
                            style={[styles.inputBox]}
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder="Password"
                            autoCapitalize='none'
                            secureTextEntry={true}
                            placeholderTextColor={this.state.passwordActive === true ? '#00bcd4' : '#999999'}
                            onFocus={() => this.setState({passwordActive:true})}
                            onBlur={() => this.setState({passwordActive:false})}
                            value={password}
                            onChangeText={(e) => this.setState({password: e})}
                            />
                    </View>


                    <TouchableOpacity style={styles.button} onPress={() => this.onSignup()}>
                        <Text style={styles.buttonText}>SIGNUP</Text>
                    </TouchableOpacity>
                    
                    <View style={{flexDirection: 'row', justifyContent:'center'}}>
                        <Text
                            style={[styles.normalText,{marginTop: height(2)}]}>
                            Already Have An Account? 
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Text
                                style={[styles.normalText,{marginTop: height(2),fontWeight: 'bold',color:'#00bcd4'}]}>
                                &nbsp;LOGIN
                            </Text>
                        </TouchableOpacity>
                    </View>
        
                </KeyboardAwareScrollView>

                <View 
                    style={{paddingBottom:10, height:height(7.5)}}>
                    <View style={{flexDirection: 'row', justifyContent:'center'}}>
                        <Text
                            style={[styles.normalText]}>
                            By signing in you agree to Boxroom`s 
                        </Text>
                        <TouchableOpacity>
                            <Text
                                style={[styles.normalText,{fontWeight: 'bold'}]}>
                                &nbsp;Terms of Services
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent:'center'}}>
                        <Text
                            style={[styles.normalText,{marginTop: height(0.5)}]}>
                            and 
                        </Text>
                        <TouchableOpacity>
                            <Text
                                style={[styles.normalText,{marginTop: height(0.5), fontWeight: 'bold'}]}>
                                &nbsp;Privacy Policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
        
    inputContainer: {
        flex: 1,
        paddingTop: height(5),
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green'
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
        // ...Platform.select({
        //     ios: {
        //       marginTop: height(5),
        //     },
        //     android: {
        //         marginTop: height(2.5),
        //     },
        // }),
        marginTop: height(4),
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
        letterSpacing: 2,
        color: '#00bcd4',
        alignSelf: 'center',
        fontWeight: 'bold',
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
    }
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...authActions
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(SignUpScreen);