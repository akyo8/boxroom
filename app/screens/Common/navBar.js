import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image, TextInput } from 'react-native';
import {width,height} from 'react-native-dimension';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import images from '../../const/images';

function mapStateToProps({ drawerTab }) {
    return { drawerTab };
}

@connect(mapStateToProps, null)
export default class NavBar extends Component {
    static propTypes = {
        drawerTab: PropTypes.shape({}).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            lastActive: false,
        };
    }

    logoImageComponent = () => {
        const { drawerTab } = this.props;
        switch (drawerTab.currentDrawer) {
            case 'Home':
                return (
                    <Image
                        source={images.navtop_icon_logo}
                        style={styles.navBut}
                    />
                );
            case 'Liked':
                return (
                    <Image
                        source={images.liked_active}
                        style={[styles.navBut, { tintColor: '#FFF' }]}
                    />
                );
            case 'Subscriptions':
                return (
                    <Image
                        source={images.subscription_active}
                        style={[styles.navBut, { tintColor: '#FFF' }]}
                    />
                );
            case 'Trending':
                return (
                    <Image
                        source={images.trending_active}
                        style={[styles.navBut, { tintColor: '#FFF' }]}
                    />
                );
            default:
                return (
                    <Image
                        source={images.history_active}
                        style={[styles.navBut, { tintColor: '#FFF' }]}
                    />
                );
        }
    }

    render() {
        const { title, onHamburgerPress, onBackPress, onSearchPress, onDownloadPress, onLogoPress, onMorePress, onSharePress } = this.props;
        return (
            <View style={[styles.outerContainer, this.props.style !== undefined ? this.props.style : null]}>
                <View style={styles.innerContainer}>
                    <View style={styles.subContainer}>
                        {
                            onHamburgerPress !== undefined ?
                                <TouchableOpacity onPress={onHamburgerPress}>
                                    <Image
                                        source={images.navtop_icon_hamburger}
                                        style={styles.navHamburger}
                                    />
                                </TouchableOpacity>
                                : null
                        }

                        {
                            onBackPress !== undefined ?
                                <TouchableOpacity onPress={onBackPress}>
                                    <Image
                                        source={images.navtop_icon_backbutton}
                                        style={styles.navHamburger}
                                    />
                                </TouchableOpacity>
                                : null
                        }


                        {
                            onLogoPress !== undefined ?
                                <TouchableOpacity onPress={onLogoPress} style={styles.navButBg} >
                                    {this.logoImageComponent()}
                                </TouchableOpacity>
                                : null
                        }

                        <View style= {styles.navTitleBG}>
                            <Text 
                                style = {styles.navTitle}>
                                {title}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.subContainer}>
                        {
                            onSearchPress !== undefined ?
                                <TouchableOpacity onPress={onSearchPress} style= {styles.navButBg} >
                                    <Image
                                        source={images.navtop_icon_search}
                                        style={styles.navBut}
                                    />
                                </TouchableOpacity>
                                : null
                        }

                        {
                            onDownloadPress !== undefined ?
                                <TouchableOpacity onPress={onDownloadPress} style= {styles.navButBg} >
                                    <Image
                                        source={images.navtop_icon_download}
                                        style={styles.navBut}
                                    />
                                </TouchableOpacity>
                                : null
                        }

                        {
                            onSharePress !== undefined ?
                                <TouchableOpacity onPress={onSharePress} style={styles.navButBg} >
                                    <Image
                                        source={images.icon_share_active}
                                        style={[styles.navBut, { tintColor: '#FFF' }]}
                                    />
                                </TouchableOpacity>
                                : null
                        }

                        {
                            onMorePress !== undefined ?
                                <TouchableOpacity onPress={onMorePress} style= {styles.navButBg} >
                                    <Image
                                        source={images.icon_detail_menu}
                                        style={styles.navBut}
                                    />
                                </TouchableOpacity>
                                : null
                        }
                    </View>
                </View>
                {onSearchPress !== undefined && this.props.showSearchBar && (
                    <View style={[styles.innerContainer, { height: 40 }]}>
                        <TextInput
                            style={[styles.inputBox]}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="Search file..."
                            placeholderTextColor={'#BBBBBB'}
                            value={this.props.searchKeyword}
                            onChangeText={(e) => this.props.searchChanged(e)}
                        />
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        width: width(100),
        backgroundColor: '#00bcd4',
        paddingTop: Platform.select({ios: 20, android: 0}),
        alignItems: 'center',
    },
    innerContainer: {
        // backgroundColor: 'blue',
        width: '90%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subContainer: {
        // backgroundColor: 'green',
        flexDirection:'row', 
        alignItems: 'center',
    },
    navHamburger:{
        resizeMode: 'contain', 
        width:width(5), 
    },
    navTitleBG :{
        marginLeft: width(2),
        alignContent: 'center',
        justifyContent: 'center',
    },

    navTitle :{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
    },

    navButBg:{
        marginLeft: 10,
        width: 40,
        height: 25,
        justifyContent:'center',
        alignContent:'center',
        // borderWidth: 1,
    },

    navBut:{
        resizeMode: 'contain', 
        width: '100%',
        height: '100%',
    },
    inputBox: {
        flex: 1,
        width: width(85),
        ...Platform.select({
            ios: {
                height: 20,
                fontSize: 14,
            },
            android: {
                fontSize: 14,
            },
        }),
        // backgroundColor: 'rgba(255,0,0,1)',

        paddingHorizontal: 16,
        color: '#FFFFFF',
        // marginVertical: height(1.5),
        marginVertical: 5,
        paddingTop: 5,
        paddingRight: 10,
        paddingBottom: 5,
        paddingLeft: 0,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FFFFFF'
    },
})
