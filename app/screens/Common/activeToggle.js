import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class ActiveToggle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { changeActiveTab, type, onShare } = this.props;
        return (
            <TouchableOpacity 
                activeOpacity={0.8}
                style={[styles.container, this.props.container_style !== undefined? this.props.container_style : null]} 
                onPress={() => {
                    if (type === 1 || type === 2) {
                        changeActiveTab(type);
                    } else if (type === 3) {
                        onShare();
                    }
                }}
            >
                <Image
                    source={(this.props.active !== undefined && this.props.active) ? this.props.image_active : this.props.image_deactive}
                    style={[styles.image, this.props.image_style !== undefined ? this.props.image_style : null]}
                />

                {
                    this.props.description !== undefined ?
                        <Text 
                            style={[styles.description, {
                                color: (this.props.active !== undefined && this.props.active) ? '#00bcd4' : (this.props.description_style !== undefined ? 'white' : '#aaaaaa'),
                            }, this.props.description_style !== undefined ? this.props.description_style : null]}
                        >
                            {this.props.description}
                        </Text>
                        : null
                }
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
    },
    image : {
        resizeMode: 'contain', 
        width: '100%',
        height: 15,
        marginBottom: 5,
    },
    description: {
        // height: 15,
        fontSize: 10,
    },
})
