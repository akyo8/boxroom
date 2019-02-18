import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default class SubCategoryBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { changeActiveTab, type, onShare } = this.props;
        return (
            <View style={styles.totalContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContentContainer}>
                    {this.props.cases.map((item, index) => {
                        return <TouchableOpacity key={index} onPress={() => this.props.onChange(index)} style={item.selected ? styles.activeTab : styles.inactiveTab}>
                            <Text style={item.selected ? styles.activeText : styles.inactiveText}>{item.text}</Text>
                        </TouchableOpacity>
                    })}
                    
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    totalContainer: {
        height: 40,
    },
    scrollViewContentContainer: {
        padding: 0,
        paddingHorizontal: 5,
        margin: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inactiveText: {
        color: '#00bcd4',
        fontSize: 15,
    },
    activeText: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    inactiveTab: {
        height: 24,
        borderRadius: 12,
        borderColor: '#00bcd4',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginHorizontal: 5,
    },
    activeTab: {
        height: 24,
        borderRadius: 12,
        borderColor: '#00bcd4',
        borderWidth: 1,
        backgroundColor: '#00bcd4',
        paddingHorizontal: 10,
        marginHorizontal: 5,
    },
    flexStyle: {
        flex: 1,
    },
})
