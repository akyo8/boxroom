var dateFormat = require('dateformat');
import { NativeModules, DeviceEventEmitter } from 'react-native';
import RNFS from 'react-native-fs';
import MusicFiles from 'react-native-get-music-files';
const { DeviceManager } = NativeModules;

import {
  updatePictureListData,
  updateMusicListData,
  updateVideoListData,
  updateDocumentListData,
  updateAppListData,
  updateArchiveListData
} from './const/constData';
import images from './const/images.js';

const getSizeString = bytes => {
    if (bytes < 1024) return bytes + ' byte' + (bytes > 1 ? 's' : '');
    let kb = Math.round(bytes / 1024);
    if (kb < 1024) return kb + ' KB';
    let mb = kb / 1024;
    if (mb < 1024) return mb.toFixed(1) + ' MB';
    let gb = mb / 1024;
    return gb + ' GB';
}

export const loadAll = () => {
  DeviceManager.getImages().then(photos => {
    let dataList = new Array(photos.length).fill({});
    let count = 0;
    photos.map((photo, idx) => {
      RNFS.stat(photo).then(res => {
        let date = new Date(res.mtime);
        let data = {
          image: {uri: 'file://' + photo},
          name: photo.substring(photo.lastIndexOf('/') + 1),
          size: getSizeString(res.size),
          exactSize: res.size,
          date: dateFormat(date, 'dd-mm-yyyy')
        }
        dataList[idx] = data;
        count ++;
        if (count === photos.length) {
          updatePictureListData(dataList);
        }
      })
    })
  })
  MusicFiles.getAll({
    blured: true,
    artist: true,
    duration: true,
    genre: true,
    title: true,
    cover: true,
    fields: ['title', 'albumTitle', 'genre', 'lyrics', 'artwork', 'duration'] // for iOs Version
  }).then(audios => {
    let dataList = new Array(audios.length).fill({});
    let count = 0;
    audios.map((audio, idx) => {
      RNFS.stat(audio.path).then(res => {
        let date = new Date(res.mtime);
        let data = {
          image: images.image_item_music,
          url: 'file://' + audio.path,
          name: audio.fileName,
          size: getSizeString(res.size),
          exactSize: res.size,
          date: dateFormat(date, 'dd-mm-yyyy'),
          ...audio,
        }
        dataList[idx] = data;
        count++;
        if (count === audios.length) {
          updateMusicListData(dataList);
        }
      })
    });
  }).catch(error => {
    console.log(error);
  });
  // DeviceManager.getAudios().then(audios => {
  //   let dataList = new Array(audios.length).fill({});
  //   let count = 0;
  //   audios.map((audio, idx) => {
  //     alert(JSON.stringify(audio));
  //     RNFS.stat(audio).then(res => {
  //       let date = new Date(res.mtime);
  //       let data = {
  //         image: images.image_item_music,
  //         url: audio,
  //         name: audio.substring(audio.lastIndexOf('/') + 1),
  //         size: getSizeString(res.size),
  //         exactSize: res.size,
  //         date: dateFormat(date, 'dd-mm-yyyy')
  //       }
  //       dataList[idx] = data;
  //       count ++;
  //       if (count === audios.length) {
  //         updateMusicListData(dataList);
  //       }
  //     })
  //   })
  // })
  DeviceManager.getVideos().then(videos => {
    let dataList = new Array(videos.length).fill({});
    let count = 0;
    videos.map((video, idx) => {
      RNFS.stat(video).then(res => {
        let date = new Date(res.mtime);
        
        let data = {
          image: {uri: 'file://' + video},
          name: video.substring(video.lastIndexOf('/') + 1),
          size: getSizeString(res.size),
          exactSize: res.size,
          date: dateFormat(date, 'dd-mm-yyyy'),
          view_count: 0,
          day: 0
        }
        dataList[idx] = data;
        count ++;
        if (count === videos.length) {
          updateVideoListData(dataList);
        }
      })
    })
  })
  DeviceManager.getDocuments().then(docs => {
    const docExts = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];
    const archiveExts = ['.zip', '.7z', '.aar'];
    const icons = {
      '.pdf': images.image_item_pdf,
      '.doc': images.image_item_word,
      '.docx': images.image_item_word,
      '.xls': images.image_item_excel,
      '.xlsx': images.image_item_excel,
      '.ppt': images.image_item_powerpoint,
      '.pptx': images.image_item_powerpoint,
    }
    let documentList = [];
    let archiveList = [];
    let apkList = [];
    docs.map((doc, idx) => {
      RNFS.stat(doc).then(res => {
        if (res.isFile() === true) {
          const fileName = doc.substring(doc.lastIndexOf('/') + 1);
          const ext = fileName.substring(fileName.lastIndexOf('.'));
          if (docExts.includes(ext)) {
            const date = new Date(res.mtime);
            const data = {
              image: icons[ext],
              name: fileName,
              size: getSizeString(res.size),
              exactSize: res.size,
              date: dateFormat(date, 'dd-mm-yyyy')
            };
            documentList.push(data);
          } else if (archiveExts.includes(ext)) {
            const date = new Date(res.mtime);
            const data = {
              image: images.image_item_archive,
              name: fileName,
              size: getSizeString(res.size),
              exactSize: res.size,
              date: dateFormat(date, 'dd-mm-yyyy')
            };
            archiveList.push(data);
          } else if (ext === '.apk') {
            let date = new Date(res.mtime);
            const data = {
              image: images.image_item_archive,
              name: fileName,
              size: getSizeString(res.size),
              exactSize: res.size,
              date: dateFormat(date, 'dd-mm-yyyy')
            }
            apkList.push(data)
          }
        }
        if (idx === docs.length - 1) {
          updateDocumentListData(documentList);
          updateArchiveListData(archiveList);
        }
      })
      .catch(err => {
        if (idx === docs.length - 1) {
          updateDocumentListData(documentList);
          updateArchiveListData(archiveList);
        }
      })
    })
  })

  // Apps
  DeviceManager.getApps().then(res => {
    let data = res.map(app => {
      let obj = {
        image: {uri: 'data:image/png;base64,' + app.icon},
        name: app.name,
        size: getSizeString(app.size),
        exactSize: app.size,
        isSystemApp: app.isSystemApp
      };
      return obj;
    })
    updateAppListData(data)
  })
}