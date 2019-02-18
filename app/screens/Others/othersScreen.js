import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { width } from 'react-native-dimension';
import GridView from 'react-native-super-grid';

import CategoryItem from '../Common/categoryItem';
import NavBar from '../Common/navBar';
import * as constData from '../../const/constData';

function mapStateToProps({ drawerTab }) {
  return { drawerTab };
}

@connect(mapStateToProps, null)
export default class OthersScreen extends Component {
  static propTypes = {
    drawerTab: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { drawerTab } = this.props;
    return (
      <View style={styles.container}>
        <NavBar
          title={drawerTab.currentDrawer}
          onHamburgerPress={() => { this.props.screenProps.rootNavigation.navigate('DrawerOpen'); }}
          onSharePress={() => { this.props.navigation.navigate('ShareContentScreen', { shareTab: 'Files' }); }}
          onSearchPress={() => {}}
          onLogoPress={() => {}}
        />
        <View style={styles.content}>
          <GridView
            style={styles.gridView}
            // itemDimension={width(40)}
            spacing={width(5)}
            items={constData.getDetailListData()}
            renderItem={ item  => (
              <CategoryItem
                item={item} 
                onPress={() => this.props.navigation.navigate(item.screen, item)}
              />
            )}
          />
        </View>
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
  gridView: {
  },
  categoryItem: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    // borderWidth: 1,
  }, 
  categoryItemImageView: {
    width: 50,
    height: '100%', 
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  categoryItemImage:{
    resizeMode: 'contain', 
    width: 15,
    height: 15,
  },
  categoryItemDescriptionView: {
    justifyContent: 'center',
  },
})