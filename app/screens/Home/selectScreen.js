import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import NavBar from '../Common/navBar';
import DetailFileView from '../Common/detailFileView';
import DetailListView from '../Common/detailListView';
import DetailGridView from '../Common/detailGridView';
import CategoryBar from '../Common/categoryBar';
import MyButton from '../Common/myButton';
import * as constData from '../../const/constData';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectItem, selectMultiItems } from '../../actions/send';

class SelectScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            select_id: 0,
            selectAllTabs: [
                false,
                false,
                false,
                false,
                false
            ],
            showSearch: false,
            searchKeyword: ''
        };
    }

    componentWillMount() {
        constData.getCategoryList().map((item, index) => {
            item.data.map((listItem, list_index) => {
                listItem.index = list_index;
                listItem.selected = false;
            });
        });
    }

    onSelectCategory(id) {
        this.setState({
            select_id: id
        });
    }

    onSelectItem(item) {
        const data = constData.getCategoryList()[this.state.select_id].data;
        const index = data.indexOf(item);
        const { selectItem } = this.props;
        selectItem(item, !item.selected);
        constData.getCategoryList()[this.state.select_id].data[index].selected = !item.selected;
    }

    onSelectAllItem(flag) {
        const { selectMultiItems } = this.props;
        const { select_id, selectAllTabs } = this.state;
        const items = [];
        const newData = constData.getCategoryList()[this.state.select_id].data.map((item, index) => {
            if (item.selected !== flag) {
                constData.getCategoryList()[this.state.select_id].data[index].selected = flag;
                items.push(item);
            }
        });
        selectMultiItems(items, flag);
        const tempSelectAllTabs = [...selectAllTabs];
        tempSelectAllTabs[select_id] = flag;
        this.setState({ selectAllTabs: tempSelectAllTabs });
        setTimeout(() => {
            this.forceUpdate();
        }, 2000);
    }

    render() {
        const { selected } = this.props;
        const { selectAllTabs, select_id, showSearch, searchKeyword } = this.state;
        const tempData = constData.getCategoryList()[select_id];
        const showData = (showSearch === false || searchKeyword === '') ?
            tempData :
            {
                ...tempData,
                data: tempData.data.filter(item => item.name.indexOf(searchKeyword) !== -1)
            };
        return (
            <View style={styles.container}>
                <NavBar
                    title='Select Files'
                    onBackPress={() => { this.props.navigation.goBack() }}
                    onSearchPress={() => { this.setState({ showSearch: !showSearch }); }}
                    onLogoPress={() => { }}
                    searchChanged={(text) => { this.setState({ searchKeyword: text }); }}
                    showSearchBar={showSearch}
                    searchKeyword={searchKeyword}
                />

                <View style={{ flex: 1 }}>
                    <CategoryBar
                        select_id={select_id}
                        data={constData.getCategoryList()}
                        onSelectCategory={this.onSelectCategory.bind(this)}
                    />

                    {
                        showData.screen === 'fileView' ?
                            <DetailFileView />
                            : null
                    }

                    {
                        showData.screen === 'listView' ?
                            <DetailListView
                                data={showData.data}
                                selectAvailable={true}
                                onSelectItem={this.onSelectItem.bind(this)}
                                onSelectAllItem={(flag) => this.onSelectAllItem(flag)}
                                selectAllList
                                selectAll={selectAllTabs[select_id]}
                            /> : null
                    }

                    {
                        showData.screen === 'gridView' ?
                            <DetailGridView
                                data={showData.data}
                                selectAvailable={true}
                                onSelectItem={this.onSelectItem.bind(this)}
                            /> : null
                    }
                </View>

                <View style={styles.buttonContainer}>
                    <MyButton
                        borderColor={selected.length === 0 ? '#AAA' : '#00bcd4'}
                        fillColor='white'
                        textColor={selected.length === 0 ? '#AAA' : '#00bcd4'}
                        text={`SELECTED (${selected.length})`}
                        disabled={selected.length === 0}
                    />

                    <MyButton
                        borderColor='#00bcd4'
                        fillColor='#00bcd4'
                        textColor='white'
                        text='NEXT'
                        onPress={() => this.props.navigation.navigate('CONNECT')}
                        disabled={selected.length === 0}
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
    buttonContainer: {
        width: '100%',
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // borderWidth: 1,
    },
})

const mapStateToProps = (state) => {
    return {
        selected: state.selected
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        selectItem,
        selectMultiItems
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectScreen);