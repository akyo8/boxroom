import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity , ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { width, height } from 'react-native-dimension';

import SubCategoryBar from '../Common/subCategoryBar';
import NavBar from '../Common/navBar';
import SectionHeader from '../Common/sectionHeader';
import DetailListView from '../Common/detailListView';
import images from '../../const/images';
import * as constData from '../../const/constData';

class PictureCategoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <SectionHeader title={this.props.info.title} />

          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{fontSize: 10, color: '#666666'}}>
              View More
            </Text>

            <Image
              source={images.icon_detail_arrow_right}
              style={styles.viewMoreButtonImage}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.categoryItemData}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this.props.info.data}
          renderItem={ ({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginLeft: width(2),
                width: width(30),
                height: this.props.info.type === 'gif' ? width(30) : (width(30) * 16 / 9),
                // borderWidth: 1,
              }}
              onPress={() => this.props.onPress(item)}
            >
              <Image
                source={item.image}
                style={{width: '100%', height: '100%'}}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

function mapStateToProps({ drawerTab, remoteData }) {
  return { drawerTab, remoteData };
}

@connect(mapStateToProps, null)
export default class PictureScreen extends Component {
  static propTypes = {
    drawerTab: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
      searchKeyword: '',
      subCategories: [
        {
          text: 'TRENDING',
          selected: false
        },
        {
          text: 'SUBSCRIPTION',
          selected: false
        },
        {
          text: 'HISTORY',
          selected: false
        },
        {
          text: 'LIKED',
          selected: false
        },
      ]
    };

    this.navigateToDetailPage = this.navigateToDetailPage.bind(this);
  }

  componentWillMount() {
  }

  changeSubCategory = (index) => {
    const tempCategories = [...this.state.subCategories];
    tempCategories[index].selected = !tempCategories[index].selected;
    this.setState({ subCategories: tempCategories });
  };

  navigateToDetailPage(item) {
    this.props.navigation.navigate('PICTURE_DETAIL', item)
  }

  render() {
    const { showSearch, searchKeyword, subCategories } = this.state;
    const { drawerTab } = this.props;
    const tempData = this.props.remoteData ? this.props.remoteData.filter((item) => item.type === 'Pictures') : [];
    const showData = (showSearch === false || searchKeyword === '') ?
      tempData : tempData.filter(item => item.name.indexOf(searchKeyword) !== -1);
    const wallPappers = showData.filter(item => item.name.indexOf('jpg') !== -1);
    const topGifs = showData.filter(item => item.name.indexOf('gif') !== -1);
    const tempWidth = (width(100) - 60) / 3;
    return (
      <View style={styles.container}>
        <NavBar
          title={drawerTab.currentDrawer}
          onHamburgerPress={() => { this.props.screenProps.rootNavigation.navigate('DrawerOpen'); }}
          onSharePress={() => { this.props.navigation.navigate('ShareContentScreen', { shareTab: 'Pictures' }); }}
          onLogoPress={() => {}}
          onSearchPress={() => { this.setState({ showSearch: !showSearch }); }}
          searchChanged={(text) => { this.setState({ searchKeyword: text }); }}
          showSearchBar={showSearch}
          searchKeyword={searchKeyword}
        />
        <SubCategoryBar cases={subCategories} onChange={(index) => this.changeSubCategory(index)}></SubCategoryBar>
        <ScrollView style={styles.content}>
          <View>
            {wallPappers.length > 0 && <View>
              <SectionHeader title='Mobile Wallpapers' viewmore />
              <View style={{ backgroundColor: '#FFF', padding: 10, marginHorizontal: 10, shadowColor: '#999', shadowOpacity: 1, shadowRadius: 2, shadowOffset: { width: 0, height: 0 } }}>
                <FlatList
                  data={wallPappers}
                  horizontal
                  renderItem={({ item, index }) => {
                    return (<TouchableOpacity onPress={() => this.props.navigation.navigate('PICTURE_DETAIL', item)} style={{ width: tempWidth, height: 150, marginRight: index !== (showData.length - 1) ? 10 : 0 }}>
                      <Image source={{ uri: item.url }} resizeMode="cover" style={{ width: tempWidth, height: 150 }}></Image>
                    </TouchableOpacity>)
                  }}
                />
              </View>
            </View>}
                        
            {topGifs.length > 0 && <View>
              <SectionHeader title='Top GIFs' viewmore />
              <View style={{ backgroundColor: '#FFF', padding: 10, marginHorizontal: 10, shadowColor: '#999', shadowOpacity: 1, shadowRadius: 2, shadowOffset: { width: 0, height: 0 } }}>
                <FlatList
                  data={topGifs}
                  horizontal
                  renderItem={({ item, index }) => {
                    return (<TouchableOpacity onPress={() => this.props.navigation.navigate('PICTURE_DETAIL', item)} style={{ width: tempWidth, height: 150, marginRight: index !== (showData.length - 1) ? 10 : 0 }}>
                      <Image source={{ uri: item.url }} resizeMode="cover" style={{ width: tempWidth, height: 150 }}></Image>
                    </TouchableOpacity>)
                  }}
                />
              </View>
            </View>}
            
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  viewMoreButtonImage: {
    resizeMode: 'contain', 
    width: 20, 
    height: 12,
    marginRight: 10,
  },
  categoryItemData: {
    marginLeft: width(1),
    marginRight: width(1),
    // width: '100%',
  }
})
