import React, { Component } from 'react';
import { View,ImageBackground, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {width,height} from 'react-native-dimension';
import images from '../const/images';

class SplashScreen extends Component{
    render(){
        return(
            <ImageBackground
                style={styles.container}
                resizeMode='cover'>
                <View
                    style={styles.logoContainer}>
                    <Image 
                        source={images.logo}
                        style={styles.logo}
                        resizeMode='contain'
                    />
                </View>
                <View
                    style={styles.startContainer}>
                    <TouchableOpacity
                        onPress={this.props.onStartPress}
                        >
                        <Image
                            source={images.splash_start}
                            resizeMode='contain'
                            style={styles.start}
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        flexDirection: 'column',
        
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: height(25),
    },
    logo: {
        justifyContent: 'center',
        width: width(100),
        height: height(30),
    },
    startContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: height(30),
        alignItems: 'center',
    },
    

    start: {
        justifyContent: 'center',
        width: width(50),
        height: height(10),
        
    },
    
});
export default SplashScreen;