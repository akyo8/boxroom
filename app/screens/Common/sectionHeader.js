import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SectionHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderMark} />

                <View style={styles.sectionHeaderTitle} >
                    <Text style={styles.sectionHeaderTitleText}>
                        {this.props.title}
                    </Text>
                </View>

                {
                    this.props.description !== undefined ?
                        <View style={styles.sectionHeaderTitle} >
                            <Text style={styles.sectionHeaderDescriptionText}>
                                - {this.props.description}
                            </Text>
                        </View>
                        : null
                }
                {
                    this.props.viewmore ? <View style={styles.viewMoreButton}>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity style={styles.viewMoreContainerStyle}>
                            <Text style={styles.viewMoreTextStyle}>View More</Text>
                            <Icon style={styles.viewMoreIconStyle} name="chevron-right" size={15} />
                        </TouchableOpacity>
                    </View> : null
                }

                {
                    this.props.shuffleAll ? <View style={styles.viewMoreButton}>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity style={styles.viewMoreContainerStyle}>
                            <Text style={styles.viewMoreTextStyle}>Shuffle All</Text>
                            <Icon style={styles.viewMoreIconStyle} name="random" size={15} />
                        </TouchableOpacity>
                    </View> : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sectionHeader: {
        // width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
    },
    sectionHeaderMark: {
        width: 4,
        height: 18,
        marginLeft: 10,
        backgroundColor: '#00bcd4',
        // borderWidth: 1,
    },
    sectionHeaderTitle : {
        height: 20,
        marginLeft: 10,
        justifyContent: 'center',
        // borderWidth: 1,
    },
    sectionHeaderTitleText : {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#00bcd4',
        // borderWidth: 1,
    },    
    sectionHeaderDescriptionText : {
        fontSize: 12,
        color: '#666666',
        // borderWidth: 1,
    },
    viewMoreTextStyle: {
        fontSize: 12,
        color: '#999999',
    },
    viewMoreIconStyle: {
        color: '#999999',
        marginRight: 5,
        marginLeft: 10,
    },
    viewMoreContainerStyle: {
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewMoreButton: {
        flex: 1,
        flexDirection: 'row',
    },
})
