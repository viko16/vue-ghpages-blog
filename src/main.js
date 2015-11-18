// vendor
import Vue from 'vue';
import Router from 'vue-router';

// components
import App from './components/App.vue';
import ListView from './components/ListView.vue';
import PostView from './components/PostView.vue';

// setting
import setting from './setting';

// debug
Vue.config.debug = true;

// install router
Vue.use(Router);

// routing
let router = new Router();

router.map({
    // todo: paginate not yet
    '/list/:page': {
        name: 'list',
        component: ListView,
        setting
    },
    '/post/:title': {
        name: 'post',
        component: PostView,
        setting
    }
});

// default router
router.redirect({
    '*': '/home'
});

router.alias({
    '/home': '/list/1'
});

// let's begin
router.start(App, '#app');