import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class CategoryBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
  
    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.data.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} activeOpacity={1} style={styles.categoryItem} onPress={() => {this.props.onSelectCategory(index)}}>
                                <View style={styles.categoryTitle}>
                                    <Text style={{fontSize: 14, color: (this.props.select_id == index) ? '#00bcd4' : '#aaaaaa'}}>
                                        {item.name}
                                    </Text>
                                </View>

                                {
                                    (this.props.select_id == index) ?
                                        <View style={{height: 2, backgroundColor: '#00bcd4'}}/>
                                        : null
                                }
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        marginBottom: 2,
        // borderWidth: 1,
    },
    categoryItem: {
        flex: 1,
        height: 50,
        // borderWidth: 1,
    },
    categoryTitle: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
