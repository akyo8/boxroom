import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TextInput, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MediaMeta from 'react-native-media-meta';
import { width, height } from 'react-native-dimension';
import images from '../const/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from "react-native-modal";
import NavBar from './Common/navBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/user';
import * as shareActions from '../actions/shareContent';

class ShareContentScreen extends Component {
    constructor(props) {
        super(props);
        const shareTabName = this.props.navigation.state.params.shareTab || '';
        this.state = {
            contentActive: false,
            descriptionActive: false,
            tagsActive: false,
            priceActive: false,
            isModalVisible: false,
            contentName: '',
            description: '',
            tags: '',
            price: '',
            loading: false,
            acceptTOS: false,
            privacy: false,
            eligable: false,
            shareTabName: shareTabName
        };
    }

    onShare = async () => {
        const { shareTabName, privacy, eligable, acceptTOS, contentName, description, tags, price, contentActive, descriptionActive, tagsActive, priceActive, loading } = this.state;
        if (!privacy || !eligable || !acceptTOS) {
            alert('Please accept Terms and Services');
            return;
        }
        if (!contentName || !description || !tags || !price) {
            alert('Please fill the gaps');
            return;
        }
        if (!this.props.user) {
            alert(JSON.stringify(this.props.screenProps))
            this.props.screenProps.screenProps.rootNavigation.navigate('AUTH_NAV');
            return;
        }
        try {
            const url = shareTabName === 'Music' ? this.props.shareContent.url.substring(7) : this.props.shareContent.image.uri.substring(7);
            let duration = 0;
            let thumb = '';
            const mediaData = await MediaMeta.get(url);
            if (mediaData) {
                duration = Number(mediaData.duration);
                thumb = mediaData.thumb;
            }
            let uploadDatas = {
                contentName,
                description,
                tags,
                price,
                shareTabName,
                duration,
            };
            if (thumb.length > 0) {
                uploadDatas = {...uploadDatas, thumb};
            }
            this.props.uploadContent(uploadDatas, this.props.shareContent, this.props);
        } catch (error) {
            this.props.uploadContent({
                contentName,
                description,
                tags,
                price,
                shareTabName,
            }, this.props.shareContent, this.props);
        }
    }

    selectFile = () => {
        this.props.selectShareItem(null);
        this.props.navigation.navigate('ShareFileScreen', { shareTab: this.state.shareTabName });
    };

    render() {
        const { shareTabName, privacy, eligable, acceptTOS, contentName, description, tags, price, contentActive, descriptionActive, tagsActive, priceActive, loading } = this.state;

        const tabNames = ['Files', 'Videos', 'Apps', 'Pictures', 'Music'];
        const tabIndex = tabNames.findIndex(item => item === shareTabName);
        const buttonTexts = ['Select File', 'Choose Video', '', 'Select Picture', 'Select Music'];
        const buttonImages = [images.shareFileIcon, images.shareVideoIcon, images.shareFileIcon, images.shareImageIcon, images.shareMusicIcon];

        return (
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                behavior="padding"
                contentContainerStyle={{ padding: 0 }}
                enabled>
                <View
                    style={styles.container}>
                    <NavBar
                        title={'Share Content'}
                        onBackPress={() => { this.props.navigation.goBack(); }}
                    />
                    <View
                        style={styles.inputContainer}>
                        <TouchableOpacity onPress={() => this.selectFile()} style={styles.selectFileContainer}>
                            <Image source={buttonImages[tabIndex]} style={{ width: width(7), height: width(7) }} resizeMode="contain"></Image>
                            <Text style={{ marginTop: 10 }}>{buttonTexts[tabIndex]}</Text>
                        </TouchableOpacity>
                        {this.props.shareContent &&
                            <Text
                                style={[styles.checkTextStyle, { marginRight: 0, marginBottom: 20, color: '#000', textAlign: 'center' }]}
                            >
                            {shareTabName === 'Music' ? this.props.shareContent.url : this.props.shareContent.image.uri}
                            </Text>
                        }
                        <View style={[styles.inputSection, { borderColor: contentActive === true ? '#00bcd4' : '#cccccc' }]}>
                            <TextInput
                                style={[styles.inputBox]}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCapitalize='none'
                                returnKeyType="next"
                                placeholder="Content Name"
                                placeholderTextColor={contentActive === true ? '#00bcd4' : '#999999'}
                                onFocus={() => this.setState({ contentActive: true })}
                                onBlur={() => this.setState({ contentActive: false })}
                                value={contentName}
                                onChangeText={e => this.setState({ contentName: e })}
                            />
                        </View>

                        <View style={[styles.inputSection, { borderColor: descriptionActive === true ? '#00bcd4' : '#cccccc' }]}>
                            <TextInput
                                style={[styles.inputBox]}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCapitalize='none'
                                returnKeyType="next"
                                placeholder="Description"
                                placeholderTextColor={descriptionActive === true ? '#00bcd4' : '#999999'}
                                onFocus={() => this.setState({ descriptionActive: true })}
                                onBlur={() => this.setState({ descriptionActive: false })}
                                value={description}
                                onChangeText={e => this.setState({ description: e })}
                            />
                        </View>

                        <View style={[styles.inputSection, { borderColor: tagsActive === true ? '#00bcd4' : '#cccccc' }]}>
                            <TextInput
                                style={[styles.inputBox]}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCapitalize='none'
                                returnKeyType="next"
                                placeholder="Tags"
                                placeholderTextColor={tagsActive === true ? '#00bcd4' : '#999999'}
                                onFocus={() => this.setState({ tagsActive: true })}
                                onBlur={() => this.setState({ tagsActive: false })}
                                value={tags}
                                onChangeText={e => this.setState({ tags: e })}
                            />
                        </View>

                        <View style={[styles.inputSection, { borderColor: priceActive === true ? '#00bcd4' : '#cccccc' }]}>
                            <TextInput
                                style={[styles.inputBox]}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCapitalize='none'
                                placeholder="Price (0 - Content is Free) USD"
                                keyboardType="number-pad"
                                placeholderTextColor={priceActive === true ? '#00bcd4' : '#999999'}
                                onFocus={() => this.setState({ priceActive: true })}
                                onBlur={() => this.setState({ priceActive: false })}
                                value={price}
                                onChangeText={e => this.setState({ price: e })}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={() => { this.setState({ acceptTOS: !acceptTOS }) }}
                            style={styles.checkBoxContainerStyle}
                        >
                            <View
                                style={styles.checkBoxStyle}>
                                {acceptTOS && <Image source={images.tickIcon} style={styles.checkIconStyle} resizeMode="contain"></Image>}
                            </View>
                            <Text style={styles.checkTextStyle}>Accept Terms of Services</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.setState({ privacy: !privacy }) }}
                            style={styles.checkBoxContainerStyle}
                        >
                            <View
                                style={styles.checkBoxStyle}>
                                {privacy && <Image source={images.tickIcon} style={styles.checkIconStyle} resizeMode="contain"></Image>}
                            </View>
                            <Text style={styles.checkTextStyle}>Privacy Policy</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.setState({ eligable: !eligable }) }}
                            style={styles.checkBoxContainerStyle}
                        >
                            <View
                                style={styles.checkBoxStyle}>
                                {eligable && <Image source={images.tickIcon} style={styles.checkIconStyle} resizeMode="contain"></Image>}
                            </View>
                            <Text style={[styles.checkTextStyle, { lineHeight: 14, fontSize: 10 }]}>
                                {"I declare that this content is eligable.\nThe content containing sexual, violent or repulsive, hateful or abusive, harmful dangerous acts.Child abuse, promots terrorism, spam or misleading, infrings rights, captions issue is forbidden!"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => this.onShare()}>
                            <Text style={styles.buttonText}>SHARE</Text>
                        </TouchableOpacity>

                        {/* <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity style={styles.forgotPasswordButton} onPress={this._toggleModal}>
                                <Text
                                    style={styles.forgotPassword}
                                >
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        

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
                        </View> */}

                
                    </View>
                    {
                        loading ?
                            <View style={styles.loadingView}>
                                <ActivityIndicator size='large' />
                            </View>
                            : null
                    }
                </View>
            </KeyboardAwareScrollView>
        )
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    selectFileContainer: {
        width: width(30),
        height: width(30),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: '#fbfbfb',
        alignSelf: 'center',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        padding: 20,
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
        marginBottom: 15,
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
    },
    selectButtonTextStyle: {
        marginTop: 10,
        color: '#999999',
        fontSize: 12,
        textAlign: 'center',
    },
    checkBoxStyle: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#999999',
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkBoxContainerStyle: {
        flexDirection: 'row',
        marginBottom: 15,
        marginLeft: 10,
        width: width(100) - 60
    },
    checkIconStyle: {
        width: 20,
        height: 20,
    },
    checkTextStyle: {
        lineHeight: 20,
        fontSize: 14,
        color: '#999999',
        marginRight: 20,
        textAlignVertical: 'center',
    },
});

const mapStateToProps = (state) => {
    return {
        shareContent: state.shareContent,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        ...authActions,
        ...shareActions
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareContentScreen);