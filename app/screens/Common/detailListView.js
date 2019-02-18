import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { width, height } from 'react-native-dimension';
import Icon from 'react-native-vector-icons/FontAwesome';

import SectionHeader from './sectionHeader';
import images from '../../const/images';
import { getLimitedString } from '../../const/util';

class DetailListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.listItem} 
                onPress={() => {
                    // if(this.props.selectAvailable) {
                    //     this.props.onSelectItem !== undefined ? this.props.onSelectItem(this.props.index) : null;
                    // } else {
                        this.props.onSelectItem !== undefined ? this.props.onSelectItem(this.props.item) : null;
                    // }
                }}
            >
                <View style={styles.listContainer}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.listItemImageView}>
                            <Image
                                source={this.props.item.image ? this.props.item.image : { uri: this.props.item.url }}
                                style={styles.listItemImage}
                            />
                        </View>
                        <View style={styles.listItemDescriptionView}>
                            <View style={{height: 20, justifyContent:'center'}}>
                                <Text>
                                    {getLimitedString(this.props.item.name, 0, 30, 'mid')}
                                </Text>
                            </View>
                            <View style={{ height: 15, flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{ width: 80 }}>
                                    <Text style={{fontSize: 10, color: '#666666'}}>
                                        {this.props.item.size ? this.props.item.size : this.props.item.fileSize}
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{fontSize: 10, color: '#666666'}}>
                                        {this.props.item.date}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {
                        this.props.selectAvailable ? (
                            <View style={styles.selectContent}>
                                <Image
                                    source={(this.props.item.selected) ? images.icon_select_active : images.icon_select_deactive}
                                    style={{width: 16, height: 16}}
                                />
                            </View>
                        ) : null
                    }
                </View>

                <View style={{height: 1, backgroundColor: '#a4a4a4'}}/>
            </TouchableOpacity>
        );
    }
}

class MusicDetailListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.listItem}
                onPress={() => {
                    // if(this.props.selectAvailable) {
                    //     this.props.onSelectItem !== undefined ? this.props.onSelectItem(this.props.index) : null;
                    // } else {
                    this.props.onSelectItem !== undefined ? this.props.onSelectItem(this.props.item) : null;
                    // }
                }}
            >
                <View style={styles.listContainer}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}>
                        <View style={styles.listItemImageView}>
                            <Image
                                source={images.image_item_music}
                                style={styles.listItemImage}
                            />
                        </View>
                        <View style={styles.listItemDescriptionView}>
                            <View style={{ height: 20, justifyContent: 'center' }}>
                                <Text>
                                    {getLimitedString(this.props.item.name.split('_')[1].split('.')[0], 0, 30, 'mid')}
                                </Text>
                            </View>
                            <View style={{ height: 15, flexDirection: 'row', alignItems: 'center' }}>
                                {/* <View style={{ width: 80 }}>
                                    <Text style={{ fontSize: 10, color: '#666666' }}>
                                        {this.props.item.size ? this.props.item.size : this.props.item.fileSize}
                                    </Text>
                                </View> */}
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 10, color: '#666666' }}>
                                        {this.props.item.album ? this.props.item.album : 'Unknown'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={{ paddingHorizontal: 10, height: 30, justifyContent: 'center' }}>
                            <Icon style={styles.viewMoreIconStyle} name="play" size={15} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 10, height: 30, justifyContent: 'center' }}>
                            <Image source={images.icon_detail_download_deactive} style={{ width: 15, height: 15 }} resizeMode="contain"></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 10, height: 30, justifyContent: 'center' }}>
                            <Icon style={styles.viewMoreIconStyle} name="ellipsis-v" size={15} />
                        </TouchableOpacity>
                    </View>

                    {
                        this.props.selectAvailable ? (
                            <View style={styles.selectContent}>
                                <Image
                                    source={(this.props.item.selected) ? images.icon_select_active : images.icon_select_deactive}
                                    style={{ width: 16, height: 16 }}
                                />
                            </View>
                        ) : null
                    }
                </View>

                <View style={{ height: 1, backgroundColor: '#a4a4a4' }} />
            </TouchableOpacity>
        );
    }
}

export default class DetailListView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const showingData = this.props.data;
    return (
        <View style={styles.content}>
            {this.props.selectAllList && showingData.length > 0 && (
                <View
                    style={styles.selectAllList}
                >
                    <View style={{ flex: 1 }} />
                    <View style={{ height: 30, justifyContent: 'center' }}>
                        <Text>
                            {'SELECT ALL'}
                        </Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.selectContent}
                        onPress={() => {
                            this.props.onSelectAllItem(!this.props.selectAll);
                        }}
                    >
                        <Image
                            source={this.props.selectAll ? images.icon_select_active : images.icon_select_deactive}
                            style={{ width: 16, height: 16 }}
                        />
                    </TouchableOpacity>
                </View>
            )}
            {this.props.music ?
                <SectionHeader title='Top List' shuffleAll /> : null}
            <FlatList
                data={showingData}
                extraData={this.props}
                removeClippedSubviews
                initialNumToRender={15}
                renderItem={ ({item, index}) => (
                    this.props.music ? <MusicDetailListItem
                        index={index}
                        item={item}
                        selectAvailable={this.props.selectAvailable !== undefined ? this.props.selectAvailable : false}
                        selected={item.selected !== undefined ? item.selected : false}
                        onSelectItem={this.props.onSelectItem}
                    /> : <DetailListItem
                            index={index}
                            item={item}
                            selectAvailable={this.props.selectAvailable !== undefined ? this.props.selectAvailable : false}
                            selected={item.selected !== undefined ? item.selected : false}
                            onSelectItem={this.props.onSelectItem}
                        />
                    
                )}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    listItem: {
        width: width(100),
        height: 55,
        // borderWidth: 1,
    },
    selectAllList: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
    },
    viewMoreIconStyle: {
        color: '#999999',
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemImageView: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
    },
    listItemImage: {
        resizeMode: 'contain', 
        width: 40,
        height: 40,
    },
    listItemDescriptionView: {
        flex: 1,
        justifyContent: 'center',
    },
    listItemDescriptionSubView: {
        height: 20, 
        justifyContent: 'center',
        // borderWidth: 1,
    },
    selectContent: {
        width: 50, 
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
    },
})