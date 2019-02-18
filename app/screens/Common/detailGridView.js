import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native';
import GridView from 'react-native-super-grid';
import { width } from 'react-native-dimension';
import images from '../../const/images';
import { getLimitedString } from '../../const/util';

class DetailGridItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        };
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.gridItem}
                onPress={() => {
                    this.props.onSelectItem(this.props.item);
                    this.setState({
                        selected: !this.state.selected
                    });
                }}
            >
                <View style={styles.gridItem}>
                    <View style={styles.gridImageContainer}>
                        <View style={styles.gridImageContentContainer}>
                            <View style={styles.gridImageContent}>
                                <Image
                                    resizeMode="contain"
                                    source={this.props.item.image}
                                    style={styles.gridItemImage}
                                />
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={{height: 18, justifyContent:'center', alignItems: 'center'}}>
                            <Text style={{textAlign: 'center'}}>
                                {getLimitedString(this.props.item.name, 0, 10, 'end')}
                            </Text>
                        </View>

                        <View style={{height: 10, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize: 10, color: '#666666'}}>
                                {this.props.item.size}
                            </Text>
                        </View>
                    </View>

                    {
                        (this.props.selectAvailable && this.props.item.selected) ? (
                            <View style={styles.selectImage}>
                                <Image
                                    source={images.icon_select_active}
                                    resizeMode="stretch"
                                    style={{ width: 16, height: 16 }}
                                />
                            </View>
                        ) : null
                    }
                </View>
                
            </TouchableOpacity>
        );
    }
}

export default class DetailGridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // alert(JSON.stringify(this.props.data));
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <GridView
            style={styles.gridView}
            itemDimension={width(21)}
            // spacing={width(1)}
            items={this.props.data}
            renderItem={ item  => (
                <DetailGridItem 
                    index={item.index}
                    item={item}
                    selectAvailable={this.props.selectAvailable !== undefined ? this.props.selectAvailable : false}
                    selected={item.selected !== undefined ? item.selected : false}
                    onSelectItem={this.props.onSelectItem}
                />
            )}
          />
            {/* <ScrollView>
                <View style={{flexDirection: 'row', overflow: 'visible'}}>
                    {
                        this.props.data.map((item, index) => {
                            return (
                                <View style={{width: width(20), height: 90}}>
                                    <DetailGridItem 
                                        index={item.index}
                                        item={item}
                                        selectAvailable={this.props.selectAvailable !== undefined ? this.props.selectAvailable : false}
                                        selected={item.selected !== undefined ? item.selected : false}
                                        onSelectItem={this.props.onSelectItem}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    },
    gridView: {
        flex: 1,
    },
    gridItem: {
        width: '100%',
        height: 90,
        backgroundColor: 'white'
        // borderWidth: 1,
    },
    gridImageContainer: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        // borderWidth: 1,
    },
    gridImageContentContainer: {
        width:  46,
        height: 46,
        borderRadius: 46 / 2,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridImageContent: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {width: 1, height: 1},
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Platform.select({ios: 'white', android: 'white'}),
        // borderWidth: 1,
    },
    gridItemImage: {
        width: 15,
        height: 15
    },
    selectImage: {
        width: 16, 
        height: 16,
        position: 'absolute',
        top: 5,
        right: Platform.select({ios: width(4), android: width(4.5)}),
    },
})