import apiConfig from './config';
import mime from 'mime-types';
import RNFS from 'react-native-fs';
export const uploadContent = async (data, file) => {
  const formData = new FormData();
  const uri = data.shareTabName === 'Music' ? file.url : file.image.uri;
  const extension = file.name.split('.')[1];
  if (data.thumb) {
    // formData.append('file', [{
    //   uri,
    //   type: mime.lookup(extension),
    //   name: data.contentName + '.' + extension
    // },{
    //   data: 'data:image/jpeg;base64,' + data.thumb,
    //   type: 'image/jpeg',
    //   name: data.contentName + '.' + 'jpeg',
    // }]);
    formData.append('file[]', {
      uri,
      type: mime.lookup(extension),
      name: data.contentName + '.' + extension
    });
    await RNFS.writeFile(RNFS.DocumentDirectoryPath + '/' + 'temp.jpeg', data.thumb, 'base64');
    formData.append('file[]', {
      uri: 'file://' + RNFS.DocumentDirectoryPath + '/' + 'temp.jpeg',
      type: 'image/jpeg',
      name: data.contentName + '.' + 'jpeg',
    });
  } else {
    formData.append('file', {
      uri,
      type: mime.lookup(extension),
      name: data.contentName + '.' + extension
    });
  }
  
  formData.append('type', data.shareTabName);
  Object.keys(data).forEach((key) => {
    if (key !== 'thumb') {
      formData.append(key, data[key]);
    }
  });
  const url = data.thumb ? apiConfig.apiUrl + 'item/add_video_item' : apiConfig.apiUrl + 'item/add_item';
  console.log(url)
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'multipart/form-data'
    },
    body: formData
  })
}

export const getAllItems = () => {
  return fetch(apiConfig.apiUrl + 'item/get_items', {
    method: 'GET',
    headers: {
      'content-type': 'application/json'
    },
  })
}