import React, { Component } from 'react';
import { Animated } from 'react-native';
import images from './images';

export const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 350,
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps

            const thisSceneIndex = scene.index
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0],
            })

            return { transform: [{ translateX }] }
        },
    }
}

export const updateVideoListData = data => {
    detailVideoList = data;
}

export const updateMusicListData = data => {
    detailMusicList = data;
}

export const updatePictureListData = data => {
    detailPictureList = data;
}

export const updateDocumentListData = data => {
    detailDocumentList = data;
}

export const updateAppListData = data => {
    detailAppList = data;
}

export const updateArchiveListData = data => {
    detailArchiveList = data;
}

export const getDetailVideoList = () => detailVideoList

export const getDetailMusicList = () => detailMusicList

export const getDetailPictureList = () => detailPictureList

export const getDetailDocumentList = () => detailDocumentList

export const getDetailAppList = () => detailAppList

export const getDetailArchieveList = () => detailArchiveList

const homeListData = [{
        name: 'Boxroom App Features Video',
        view_count: 960,
        day: 2,
        image: images.image_video_cover,
    }
];

const detailVideoList = [];

const detailMusicList = [];

let detailPictureList = [];

const detailDocumentList = [];

const detailAppList = [
    // {
    //     image: images.icon_category_video,
    //     name: 'Videos',
    //     size: '14.2 MB',
    //     date: '21-07-2018'
    // },
];

const detailArchiveList = [
    // {
    //     image: images.image_item_archive,
    //     name: 'Calibri.zip',
    //     size: '1.70 MB',
    //     date: '21-07-2018'
    // },
];

const detailFavoriteList = [];

const detailHistoryList = [];

export const getDetailListData = () => [{
    screen: 'OTHERS_DETAIL',
    detailScreen: 'OTHER_VIDEO_DETAIL',
    title: 'Videos',
    image: images.icon_category_video,
    data: detailVideoList,
},
{
    screen: 'OTHERS_DETAIL',
    detailScreen: 'OTHER_MUSIC_DETAIL',
    title: 'Music',
    image: images.icon_category_music,
    data: detailMusicList,
},
{
    screen: 'OTHERS_DETAIL',
    detailScreen: 'OTHER_PICTURE_DETAIL',
    title: 'Pictures',
    image: images.icon_category_picture,
    data: detailPictureList,
},
{
    screen: 'OTHERS_DETAIL',
    detailScreen: 'OTHER_DOCUMENT_DETAIL',
    title: 'Documents',
    image: images.icon_category_documents,
    data: detailDocumentList,
},
{
    screen: 'OTHERS_DETAIL',
    detailScreen: 'OTHER_APP_DETAIL',
    title: 'Apps',
    image: images.icon_category_app,
    data: detailAppList,
},
{
    screen: 'OTHERS_DETAIL',
    detailScreen: 'OTHER_ARCHIVE_DETAIL',
    title: 'Archive Files',
    image: images.icon_category_archive,
    data: detailArchiveList,
},
{
    screen: 'OTHERS_DETAIL',
    title: 'Favorites',
    image: images.icon_category_favorite,
    data: detailFavoriteList,
},
{
    screen: 'OTHERS_DETAIL',
    title: 'History',
    image: images.icon_category_history,
    data: detailHistoryList,
},
];


export const getCategoryList = () => [{
        name: 'Files',
        screen: 'fileView',
        data: [],
    },
    {
        name: 'Videos',
        screen: 'listView',
        data: detailVideoList,
    },
    {
        name: 'Apps',
        screen: 'gridView',
        data: detailAppList,
    },
    {
        name: 'Pictures',
        screen: 'listView',
        data: detailPictureList,
    },
    {
        name: 'Music',
        screen: 'listView',
        data: detailMusicList,
    },
];

const pictureList = [{
        title: 'Mobile Wallpapers',
        type: 'wallpaper',
        data: [{
                name: 'Minimilistic wallpaper',
                image: images.image_picture_wallpaper,
            },
            {
                name: 'Minimilistic wallpaper',
                image: images.image_picture_wallpaper,
            },
            {
                name: 'Minimilistic wallpaper',
                image: images.image_picture_wallpaper,
            },
            {
                name: 'Minimilistic wallpaper',
                image: images.image_picture_wallpaper,
            },
            {
                name: 'Minimilistic wallpaper',
                image: images.image_picture_wallpaper,
            },
            {
                name: 'Minimilistic wallpaper',
                image: images.image_picture_wallpaper,
            },
        ],
    },
    {
        title: 'Top GIFs',
        type: 'gif',
        data: [{
                name: 'GIF Image',
                image: images.image_picture_gif,
            },
            {
                name: 'GIF Image',
                image: images.image_picture_gif,
            },
            {
                name: 'GIF Image',
                image: images.image_picture_gif,
            },
            {
                name: 'GIF Image',
                image: images.image_picture_gif,
            },
            {
                name: 'GIF Image',
                image: images.image_picture_gif,
            },
            {
                name: 'GIF Image',
                image: images.image_picture_gif,
            },
            {
                name: 'GIF Image',
                image: images.image_picture_gif,
            },
        ],
    },
    {
        title: 'Inspiring Quotes',
        type: 'quote',
        data: [{
                name: 'Inspring Quote',
                image: images.image_picture_wallpaper,
            },
            {
                name: 'Inspring Quote',
                image: images.image_picture_wallpaper,
            },
            {
                name: 'Inspring Quote',
                image: images.image_picture_wallpaper,
            },
            {
                name: 'Inspring Quote',
                image: images.image_picture_wallpaper,
            },
            {
                name: 'Inspring Quote',
                image: images.image_picture_wallpaper,
            },
            {
                name: 'Inspring Quote',
                image: images.image_picture_wallpaper,
            },
            {
                name: 'Inspring Quote',
                image: images.image_picture_wallpaper,
            },
            {
                name: 'Inspring Quote',
                image: images.image_picture_wallpaper,
            },
        ],
    },
];
