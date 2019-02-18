import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Share, { ShareSheet, Button } from 'react-native-share';
import { Thumbnail } from 'react-native-thumbnail-video';

import ActiveToggle from '../Common/activeToggle';
import images from '../../const/images';

export default class HomeListItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
        };
    }

    shareFile = () => {
        const shareItem = {
            title: "React Native",
            message: this.props.item.name,
            url: this.props.item.image ? this.props.item.image.uri : this.props.item.url,
            subject: "Share File" //  for email
        };

        Share.open(shareItem);
    };

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
        let duration = this.props.item.duration / 1000;
        if (duration) {
            duration = `${(duration / 60).toFixed(0)}:${duration % 60}`
        }
        return(
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
                    <Image
                        source={this.props.item.image ? this.props.item.image : { uri: this.props.item.thumb ? this.props.item.thumb : this.props.item.url }}
                        style={styles.listImageItem}
                    />
                    <View style={styles.durationContainer}>
                        <Text style={styles.durationText}>{duration}</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.content}>
                    <View style={styles.descriptionContent}>
                        <Text style={styles.listTitleItem}>
                            {this.props.item.name}
                        </Text>
                        <Text style={styles.listDescriptionItem}>
                            {this.props.item.view_count} views  -  {this.props.item.day} days ago
                        </Text>
                    </View>

                    <View style={styles.buttonContent}>
                        <ActiveToggle type={1} changeActiveTab={(type) => { this.changeActiveTab(type); }} active={activeTab === 1} image_active={images.icon_detail_like_active} image_deactive={images.icon_detail_like_deactive} description='1.1K' />
                        <ActiveToggle type={2} changeActiveTab={(type) => { this.changeActiveTab(type); }} active={activeTab === 2} image_active={images.icon_detail_dislike_active} image_deactive={images.icon_detail_dislike_deactive} description='1.1K' />
                        <ActiveToggle type={3} onShare={() => { this.shareFile(); }} image_deactive={images.icon_share_deactive} description='Share' />
                        <ActiveToggle type={4} image_deactive={images.icon_detail_menu} />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // shadowColor: '#000',
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {width: 1, height: 1,},
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    content: {
        width: '100%',
        height: 50, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    descriptionContent: {
        justifyContent: 'center',
        height: '100%',
        marginLeft: 10,
    },
    listImageItem :{
        width: '100%',
        height: 185,
    },
    listTitleItem :{
        fontSize: 12,
        color: '#333333',
        // borderWidth : 1,
    },
    listDescriptionItem :{
        fontSize: 8,
        color: '#333333',
        marginTop: 5, 
        // borderWidth : 1,
    },
    buttonContent: {
        flexDirection:'row', 
        alignItems: 'center',
    },
    durationContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 80,
        height: 20,
        backgroundColor: '#00000080',
        justifyContent: 'center',
        alignItems: 'center',
    },
    durationText: {
        color: '#FFF',
        fontSize: 12,
    },
});