import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
  
    render() {
        const { borderColor, width, height, disabled, onPress, textColor, fillColor, text } = this.props;
        return (
            <TouchableOpacity 
                onPress={() => {(onPress !== undefined) ? onPress() : null }}
                activeOpacity={0.8} 
                style={{
                    backgroundColor: borderColor, 
                    width: (width != undefined) ? width : '48%',
                    height: (height != undefined) ? height : 40,
                }}
                disabled={disabled}
            >
                <View style={[styles.buttonInner, {backgroundColor: fillColor}]}>
                    <Text style={{color: textColor}}>
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonInner: {
        flex: 1,
        marginTop: 1,
        marginBottom: 1,
        marginLeft: 1,
        marginRight: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
