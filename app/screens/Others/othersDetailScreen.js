import React, { Component } from 'react';
import { View, StyleSheet, } from 'react-native';
import NavBar from '../Common/navBar';
import DetailListView from '../Common/detailListView';

export default class OthersDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
      searchKeyword: ''
    };
  }

  onSelectItem = item => {
    const { detailScreen } = this.props.navigation.state.params;
    this.props.navigation.navigate(detailScreen, {image: item.image, name: item.name})
  }

  render() {
    const { showSearch, searchKeyword } = this.state;
    const { title, data } = this.props.navigation.state.params;
    const showData = (showSearch === false || searchKeyword === '') ?
      data : data.filter(item => item.name.indexOf(searchKeyword) !== -1);
    return (
      <View style={styles.container}>
        <NavBar
          title={title}
          onBackPress={() => {this.props.navigation.goBack()}}
          onLogoPress={() => {}}
          onSearchPress={() => { this.setState({ showSearch: !showSearch }); }}
          searchChanged={(text) => { this.setState({ searchKeyword: text }); }}
          showSearchBar={showSearch}
          searchKeyword={searchKeyword}
        />

        <DetailListView onSelectItem={this.onSelectItem} data={showData} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})