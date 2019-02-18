import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { width } from 'react-native-dimension';

export default class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.categoryItem} 
                onPress={() => {this.props.onPress()}}
            >
                <View style={styles.categoryItemImageView}>
                    <Image
                        source={this.props.item.image}
                        style={styles.categoryItemImage}
                    />
                </View>

                <View style={styles.categoryItemDescriptionView}>
                    <Text>
                        {this.props.item.title}
                    </Text>
    
                    <Text style={{fontSize: 10, color: '#666666'}}>
                        {this.props.item.data.length} Items
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    categoryItem: {
        width: width(40),
        height: 60,
        flexDirection: 'row',
        // borderWidth: 1,
    }, 
    categoryItemImageView: {
        width: 50,
        height: '100%', 
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
    },
    categoryItemImage:{
        resizeMode: 'contain', 
        width: 15,
        height: 15,
    },
    categoryItemDescriptionView: {
        justifyContent: 'center',
    },
})