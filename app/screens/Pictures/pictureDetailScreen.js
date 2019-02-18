import React, { Component } from 'react';
import { Platform, View, StyleSheet, StatusBar,Text, Image, TouchableOpacity } from 'react-native';
import Share, { ShareSheet, Button } from 'react-native-share';
import NavBar from '../Common/navBar';
import {width,height} from 'react-native-dimension';
import images from '../../const/images';
import ActiveToggle from '../Common/activeToggle';

export default class PictureDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            item: props.navigation.state.params || {}
        };
    }

    shareFile = () => {
        const { item } = this.state;
        const shareItem = {
            title: "React Native",
            message: item.name,
            url: item.image ? item.image.uri : item.url,
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
      const { activeTab, item } = this.state;
    return (
      <View style={styles.container}>
        {
            <StatusBar hidden={Platform.select({ios: true, android: false})}/>
        }
        
        <Image
            source={item.image ? item.image : { uri: item.url }}
            style={{
                position: 'absolute',
                resizeMode: 'contain', 
                width: '100%',
                height: '100%',
                // height: this.props.navigation.state.params.type === 'gif' ? width(100) : width(100) * 16 / 9,
            }}
        />

        <NavBar
          title={item.name}
          onBackPress={() => {this.props.navigation.goBack()}}
          onMorePress={() => {}}
          style={{backgroundColor: '#00000080', paddingTop: 0}}
        />

        <View style={styles.buttonContent}>
            <ActiveToggle type={1} changeActiveTab={(type) => { this.changeActiveTab(type); }} active={activeTab === 1} image_active={images.icon_detail_like_active} image_deactive={images.icon_picture_like_deactive} description='1.1K' 
                container_style={styles.toggleContainerStyle}
                image_style={styles.toggleImageStyle}
                description_style={styles.toggleDescriptionStyle}
            />
            <ActiveToggle type={2} changeActiveTab={(type) => { this.changeActiveTab(type); }} active={activeTab === 2} image_active={images.icon_detail_dislike_active} image_deactive={images.icon_picture_dislike_deactive} description='1.1K' 
                container_style={styles.toggleContainerStyle}
                image_style={styles.toggleImageStyle}
                description_style={styles.toggleDescriptionStyle}
            />
            <ActiveToggle type={3} onShare={() => { this.shareFile(); }} image_deactive={images.icon_picture_share_deactive} description='Share' 
                container_style={styles.toggleContainerStyle}
                image_style={styles.toggleImageStyle}
                description_style={styles.toggleDescriptionStyle}
            />
            <ActiveToggle type={4} image_deactive={images.icon_picture_download_deactive} description='Download' 
                container_style={styles.toggleContainerStyle}
                image_style={styles.toggleImageStyle}
                description_style={styles.toggleDescriptionStyle}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  buttonContent: {
      backgroundColor: '#00000080',
      height: 55,
      paddingLeft: width(5),
      paddingRight: width(5),
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
  },
  toggleContainerStyle: {
      width: 80,
  },
  toggleImageStyle: {
      height: 20,
      marginBottom: 5,
  },
  toggleDescriptionStyle: {
      fontSize: 11,
  },
})
