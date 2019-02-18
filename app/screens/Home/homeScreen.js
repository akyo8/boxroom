import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { width, height } from 'react-native-dimension';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from '../Common/navBar';
import SectionHeader from '../Common/sectionHeader';
import SubCategoryBar from '../Common/subCategoryBar';
import HomeListItem from './homeListItem';

import HomeMenuScreen from '../Home/homeMenu';

import images from '../../const/images';
import * as constData from '../../const/constData';

function mapStateToProps({ drawerTab, remoteData }) {
  return { drawerTab, remoteData };
}

@connect(mapStateToProps, null)
export default class HomeScreen extends Component {
  static propTypes = {
    drawerTab: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);

    console.disableYellowBox = true;

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
  }

  onSend = () => {
    this.props.navigation.navigate('SELECT_FILES')
  }

  onReceive = () => {
    this.props.navigation.navigate('RECEIVE_FILES');
  }

  changeSubCategory = (index) => {
    const tempCategories = [...this.state.subCategories];
    tempCategories[index].selected = !tempCategories[index].selected;
    this.setState({ subCategories: tempCategories });
  };

  render() {
    const { showSearch, searchKeyword, subCategories } = this.state;
    const { drawerTab } = this.props;
    const tempData = this.props.remoteData ? this.props.remoteData.filter((item) => item.type === 'Videos') : [];
    const showData = (showSearch === false || searchKeyword === '') ?
      tempData : tempData.filter(item => item.name.indexOf(searchKeyword) !== -1);
    return (
      <View style={styles.container}>
        <NavBar
          title={drawerTab.currentDrawer}
          onHamburgerPress={() => { this.props.screenProps.rootNavigation.navigate('DrawerOpen'); }}
          onSharePress={() => { this.props.navigation.navigate('ShareContentScreen', { shareTab: 'Videos' }); }}
          onLogoPress={() => {}}
          onSearchPress={() => { this.setState({ showSearch: !showSearch }); }}
          searchChanged={(text) => { this.setState({ searchKeyword: text }); }}
          showSearchBar={showSearch}
          searchKeyword={searchKeyword}
        />
        <SubCategoryBar cases={subCategories} onChange={(index) => this.changeSubCategory(index)}></SubCategoryBar>
        <ScrollView style={styles.content}>
          <View>
            <SectionHeader title='Recommended' description='Based on your interest' />
            <FlatList
              data={showData}
              renderItem={({item}) => {
                return (<HomeListItem item={item} onPress={() => this.props.navigation.navigate('VIDEO_DETAIL', item)}/>)
              }}
            />
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
  content: {
    flex: 1,
  },
  shareContent: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  shareItem: {
    // width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareItemImage: {
    resizeMode: 'contain', 
    width: 45,
    height: 24,
  },
  shareItemText: {
    fontSize: 16,
    color: '#333333',
  },
});
