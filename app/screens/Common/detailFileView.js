import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { width } from 'react-native-dimension';
import SectionHeader from './sectionHeader';
import CategoryItem from './categoryItem';
import images from '../../const/images';

import * as constData from '../../const/constData';

export default class DetailFileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
        <View style={styles.content}>
            <View>
                <SectionHeader title='Documents' />

                <View style={styles.documentsContent}>
                    <CategoryItem
                        item={{
                            title: 'Documents',
                            data: constData.getDetailDocumentList(),
                            image: images.icon_category_documents,
                        }}
                        onPress={() => {}}
                    />

                    <CategoryItem
                        item={{
                            title: 'Archive Files',
                            data: constData.getDetailArchieveList(),
                            image: images.icon_category_archive,
                        }}
                        onPress={() => {}}
                    />
                </View>
            </View>

            <View>
                <SectionHeader title='Folders' />

                <TouchableOpacity activeOpacity={0.8} style={styles.documentsContent}>
                    <Image
                        source={images.icon_storage}
                        style={styles.folderImage}
                    />

                    <View style={styles.folderDescriptionContainer}>
                        <View style={styles.folderDescriptionContent}>
                            <View>
                                <Text style={{fontSize: 14}}>
                                    Internal Storage
                                </Text>
                            </View>

                            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Text style={{fontSize: 10, color: '#4b72f3'}}>
                                    45.29 GB
                                </Text>

                                <Text style={{fontSize: 10, color: '#666666'}}>
                                    / 64.00 GB
                                </Text>
                            </View>
                        </View>

                        <View>
                            <Progress.Bar 
                                progress={0.8}
                                animated={false}
                                color='#4b72f3'
                                unfilledColor='#aaaaaa'
                                borderWidth={0}
                                borderColor='transparent'
                                width={width(67)}
                                height={2}
                            />
                        </View>
                    </View>
                    
                    <Image
                        source={images.icon_detail_arrow_right}
                        style={styles.arrowImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    documentsContent: {
        width: '90%',
        height: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '5%',
        // borderWidth: 1,
    },
    folderImage: {
        resizeMode: 'contain', 
        width: 40, 
        height: 40,
    },
    folderDescriptionContainer: {
        width: width(67),
        height: 40,
        justifyContent: 'space-around',
        // borderWidth: 1,
    },
    folderDescriptionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1,
    },
    arrowImage: {
        resizeMode: 'contain', 
        width: 15, 
        height: 15,
    },
})
