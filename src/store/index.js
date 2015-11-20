// vendor
import { EventEmitter } from 'events';
import { Promise } from 'es6-promise';

// setting
import setting from '../setting';

const LIST_API_URL = `https://api.github.com/repos/${setting.config.repo}/contents/${setting.config.path}?ref=${setting.config.branch}`;
const POST_API_URL = `https://raw.githubusercontent.com/${setting.config.repo}/${setting.config.branch}/${setting.config.path}`;

let store = new EventEmitter();


export default store;

/**
 * fetch post content from github
 *
 * @param title
 * @returns {Promise}
 */
store.getPost = (title) => {
    return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();

        xhr.open('GET', `${POST_API_URL}/${title}`);
        xhr.onload = () => {
            const resText = xhr.responseText;
            resolve(resText);
        };
        xhr.onerror = () => reject;
        xhr.send();

    });
}

/**
 * fetch the list from cache or from github api
 *
 * @todo paginate not yet
 *
 * @param page
 * @returns {Promise}
 */
store.getListByPage = (page = 1) => {
    return new Promise((resolve, reject) => {

        if (sessionStorage.getItem('posts')) {

            // read data from cache
            resolve(JSON.parse(sessionStorage.posts));

        } else {

            const xhr = new XMLHttpRequest();

            xhr.open('GET', LIST_API_URL);
            xhr.onload = () => {
                const resJson = xhr.responseText;
                // caching
                sessionStorage.setItem('posts', resJson);

                resolve(JSON.parse(resJson));
            };
            xhr.onerror = () => reject;
            xhr.send();

        }

    });

}