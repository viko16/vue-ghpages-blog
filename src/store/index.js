// vendor
import { EventEmitter } from 'events';
import { Promise } from 'es6-promise';

// setting
import setting from '../setting';

const listApiUrl = `https://api.github.com/repos/${setting.config.repo}/contents/${setting.config.path}?ref=${setting.config.brance}`;
const postUrl = `https://raw.githubusercontent.com/${setting.config.repo}/${setting.config.brance}/${setting.config.path}`;

let store = new EventEmitter();


export default store;


store.getPost = (title) => {
  return new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `${postUrl}/${title}`);
          xhr.onload = () => {
            const resText = xhr.responseText;
            resolve(resText);
          }
          xhr.onerror = () => reject;
          xhr.send();

  });
}

// todo: paginate not yet
store.getListByPage = (page = 1) => {
    return new Promise((resolve, reject) => {

      if(sessionStorage.getItem('posts')) {
        // read data from cache
        resolve(JSON.parse(sessionStorage.posts));
      } else {

          const xhr = new XMLHttpRequest();

          xhr.open('GET', listApiUrl);
          xhr.onload = () => {
            const resJson = xhr.responseText;
            // caching
            sessionStorage.setItem('posts', resJson);

            resolve(JSON.parse(resJson));
          }
          xhr.onerror = () => reject;
          xhr.send();
          
        }

    });
  
}