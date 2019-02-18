import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavBar from '../Common/navBar';
import SectionHeader from '../Common/sectionHeader';
import SubCategoryBar from '../Common/subCategoryBar';
import DetailListView from '../Common/detailListView';
import HomeListItem from '../Home/homeListItem';
import * as constData from '../../const/constData';

function mapStateToProps({ drawerTab, remoteData }) {
  return { drawerTab, remoteData };
}

@connect(mapStateToProps, null)
export default class VideoScreen extends Component {
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
  }

  changeSubCategory = (index) => {
    const tempCategories = [...this.state.subCategories];
    tempCategories[index].selected = !tempCategories[index].selected;
    this.setState({ subCategories: tempCategories });
  };


  navigateToDetailPage(item) {
    this.props.navigation.navigate('VIDEO_DETAIL', item)
  }

  render() {
    const { showSearch, searchKeyword, subCategories } = this.state;
    const { drawerTab } = this.props;
    // const tempData = constData.getDetailVideoList();
    const tempData = this.props.remoteData ? this.props.remoteData.filter((item) => item.type === 'Videos') : [];
    const showData = (showSearch === false || searchKeyword === '') ?
      tempData : tempData.filter(item => item.name.indexOf(searchKeyword) !== -1);
    return (
      <View style={styles.container}>
        <NavBar
          title={drawerTab.currentDrawer}
          onHamburgerPress={() => { this.props.screenProps.rootNavigation.navigate('DrawerOpen'); }}
          onLogoPress={() => {}}
          onSearchPress={() => { this.setState({ showSearch: !showSearch }); }}
          onSharePress={() => { this.props.navigation.navigate('ShareContentScreen', { shareTab: 'Videos' }); }}
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
              renderItem={({ item }) => {
                return (<HomeListItem item={item} onPress={() => this.props.navigation.navigate('VIDEO_DETAIL', item)} />)
              }}
            />
          </View>
        </ScrollView>
        {/* <DetailListView data={showData} onSelectItem={this.navigateToDetailPage.bind(this)} /> */}
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
})