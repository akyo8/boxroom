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
import { selectShareItem } from '../../actions/shareContent';

class ShareFileScreen extends Component {

    constructor(props) {
        super(props);
        const shareTabName = this.props.navigation.state.params.shareTab;
        const tabNames = ['Files', 'Videos', 'Apps', 'Pictures', 'Music'];
        this.state = {
            select_id: tabNames.findIndex(item => item === shareTabName),
            selectAllTabs: [
                false,
                false,
                false,
                false,
                false
            ],
            showSearch: false,
            searchKeyword: '',
            shareTabName: shareTabName || '',
            selected: null
        };
        this.availableData = constData.getCategoryList()[tabNames.findIndex(item => item === shareTabName)];
    }

    componentWillMount() {
        this.availableData.data.map((listItem, list_index) => {
            listItem.index = list_index;
            listItem.selected = false;
        });
    }

    onSelectItem(item) {
        const data = this.availableData.data;
        const index = data.indexOf(item);
        this.availableData.data.map((listItem, list_index) => {
            listItem.selected = false;
        });
        this.availableData.data[index].selected = !item.selected;
        this.setState({ selected: item });
    }

    render() {
        const { selectAllTabs, select_id, showSearch, searchKeyword, selected } = this.state;
        const tempData = this.availableData;
        const showData = (showSearch === false || searchKeyword === '') ?
            tempData :
            {
                ...tempData,
                data: tempData.data.filter(item => item.name.indexOf(searchKeyword) !== -1)
            };
        return (
            <View style={styles.container}>
                <NavBar
                    title={`Select ${this.state.shareTabName}`}
                    onBackPress={() => { this.props.navigation.goBack() }}
                    onSearchPress={() => { this.setState({ showSearch: !showSearch }); }}
                    searchChanged={(text) => { this.setState({ searchKeyword: text }); }}
                    showSearchBar={showSearch}
                    searchKeyword={searchKeyword}
                />

                <View style={{ flex: 1 }}>

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
                        borderColor='#00bcd4'
                        fillColor='#00bcd4'
                        textColor='white'
                        text='DONE'
                        onPress={() => {
                            this.props.selectShareItem(selected);
                            this.props.navigation.goBack();
                        }}
                        disabled={selected === null}
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
        selectShareItem
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareFileScreen);