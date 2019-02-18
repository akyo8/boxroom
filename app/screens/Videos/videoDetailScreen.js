import React, { Component } from 'react';
import { View, StyleSheet, ScrollView,Text, Image, TouchableOpacity, Animated } from 'react-native';
import Share, { ShareSheet, Button } from 'react-native-share';
import NavBar from '../Common/navBar';
import {width,height} from 'react-native-dimension';
import images from '../../const/images';
import ActiveToggle from '../Common/activeToggle';
import SectionHeader from '../Common/sectionHeader';

class DetailInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            more_showed: false,
            height: new Animated.Value(0),
            activeTab: 1,
        };
    }

    shareFile = () => {
        const shareItem = {
            title: "React Native",
            message: this.props.name,
            url: this.props.image.uri,
            subject: "Share File" //  for email
        };

        Share.open(shareItem);
    };

    onDetailInfoPressed() {
        Animated.timing(this.state.height, {
            toValue: !this.state.more_showed ? 100 : 0,
            duration: 500,
        }).start();

        this.setState({
            more_showed: !this.state.more_showed
        });
    }

    changeActiveTab = (type) => {
        const { activeTab } = this.state;
        switch (type) {
            case 1:
                if (activeTab === type) {
                    this.setState({ activeTab: 0 });
                } else {
                    this.setState({ activeTab: 1 });
                }
                break;
            case 2:
                if (activeTab === type) {
                    this.setState({ activeTab: 0 });
                } else {
                    this.setState({ activeTab: 2 });
                }
                break;
            case 3:
            case 4:
                break;
            default:
                break;
        }
    };

    render() {
        const { activeTab } = this.state;
        return (
            <View style={{width: '100%'}}>
                <View style={styles.descriptionTitleContent}>
                    <Text style={{fontSize: 16}}>
                        {this.props.name}
                    </Text>

                    <TouchableOpacity activeOpacity={0.8} onPress={this.onDetailInfoPressed.bind(this)}>
                        <Image
                            source={this.state.more_showed ? images.icon_detail_arrow_up : images.icon_detail_arrow_down}
                            style={styles.descriptionMoreArrow}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.descriptionInfoText}>
                        {this.props.view_count} views  -  {this.props.day} days ago
                    </Text>
                </View>

                <View style={styles.descriptionTitleContent}>
                    <TouchableOpacity style={{width: 80, alignItems: 'center'}}>
                        <Text style={styles.descriptionInfoText}>
                            REPORT
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.buttonContent}>
                        <ActiveToggle type={1} changeActiveTab={(type) => { this.changeActiveTab(type); }} active={activeTab === 1} image_active={images.icon_detail_like_active} image_deactive={images.icon_detail_like_deactive} description='1.1K' />
                        <ActiveToggle type={2} changeActiveTab={(type) => { this.changeActiveTab(type); }} active={activeTab === 2} image_active={images.icon_detail_dislike_active} image_deactive={images.icon_detail_dislike_deactive} description='1.1K' />
                        <ActiveToggle type={3} onShare={() => { this.shareFile(); }} image_deactive={images.icon_share_deactive} description='Share' />
                        <ActiveToggle type={4} active={true} image_active={images.icon_detail_download_active} image_deactive={images.icon_detail_download_deactive} description='Download' 
                            container_style={{width: 50}}
                            // description_style={{fontSize: 8, color: '#aaaaaa'}}
                        />
                    </View>
                </View>

                <Animated.View style={{width: '100%', height: this.state.height, overflow: 'hidden'}}>
                    <View style={{height: 1, backgroundColor: '#dddddd'}}/>

                    <View style={{height: 40, justifyContent: 'center'}}>
                        <Text>
                            Published on Jul 21, 2018
                        </Text>
                    </View>

                    <View style={{height: 59}}>
                        <Text style={styles.descriptionInfoText}>
                            Video description by publisher
                        </Text>
                    </View>
                </Animated.View>
            </View>
        )
    }
}

class RelatedVideoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.relatedItem} 
                onPress={() => {
                }}
            >
                <View style={styles.relatedItemContainer}>
                    <View style={{height: '100%', flexDirection: 'row'}}>
                        <View style={styles.relatedItemImageView}>
                            <Image
                                source={this.props.image}
                                style={styles.relatedItemImage}
                            />
                        </View>
                        <View style={styles.relatedItemDescriptionView}>
                            <View style={{height: 30, justifyContent:'center'}}>
                                <Text style={{fontSize: 14}}>
                                    {this.props.name}
                                </Text>
                            </View>
                            <View style={{height: 15, flexDirection: 'row', alignItems:'center'}}>
                                <View>
                                    <Text style={{fontSize: 12, color: '#666666'}}>
                                        {this.props.view_count} views
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default class VideoDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { image, url, thumb } = this.props.navigation.state.params;
    return (
        <View style={styles.container}>
            <NavBar
                title={this.props.navigation.state.params.name}
                onBackPress={() => {this.props.navigation.goBack()}}
            />

            <ScrollView style={{width: '100%'}}>
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('VIDEO_PLAYER', { image: image ? image : { uri: url } })
                        }
                        }
                        activeOpacity={1}
                    >
                        <Image
                            source={image ? image : { uri: thumb ? thumb : '' }}
                            style={styles.coverImage}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <DetailInfo 
                        name={this.props.navigation.state.params.name}
                        image={image ? image : { uri: url }}
                        view_count={this.props.navigation.state.params.view_count}
                        day={this.props.navigation.state.params.day}
                    />

                    <View style={{ backgroundColor: 'white' }}>
                        <SectionHeader title='You may also like this' />

                        <View>
                            {/* <RelatedVideoItem image={images.image_video_cover} name='Boxroom App Features Video' view_count={960}/>
                            <RelatedVideoItem image={images.image_video_cover} name='Boxroom App Features Video' view_count={960}/>
                            <RelatedVideoItem image={images.image_video_cover} name='Boxroom App Features Video' view_count={960}/> */}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    coverImage :{
        width: width(100),
        height: width(56.25),
    },
    content: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    descriptionTitleContent: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderWidth: 1,
    },
    descriptionMoreArrow: {
        resizeMode: 'contain', 
        width: 15,
        height: 15,
    },
    descriptionInfoText :{
        fontSize: 12,
        color: '#333333',
        // borderWidth : 1,
    },
    buttonContent: {
        flexDirection:'row', 
        alignItems: 'center',
    },
    relatedItem: {
        width: '100%',
        height: 100,
        // borderWidth: 1,
    },
    relatedItemContainer: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    relatedItemImageView: {
        width: 140,
        height: '100%', 
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
    },
    relatedItemImage: {
        // resizeMode: 'contain', 
        width: 120,
        height: 75,
    },
    relatedItemDescriptionView: {
      justifyContent: 'center',
    },
    relatedItemDescriptionSubView: {
        height: 20, 
        justifyContent: 'center',
        // borderWidth: 1,
    },
})
