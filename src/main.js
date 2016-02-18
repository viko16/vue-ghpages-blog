// vendor
import Vue from 'vue';
import Router from 'vue-router';

// components
import App from './components/App.vue';
// import ListView from './components/ListView.vue';
// import PostView from './components/PostView.vue';

// setting
import setting from './setting';

// debug
Vue.config.debug = true;

// install router
Vue.use(Router);

// routing
let router = new Router;

router.map({
    '/list/:page': {
        name: 'list',
        // code splitting for component async loading
        // http://cn.vuejs.org/guide/components.html#u5F02_u6B65_u7EC4_u4EF6
        component: resolve => require(['./components/ListView.vue'], resolve),
        setting
    },
    '/post/:title': {
        name: 'post',
        component: resolve => require(['./components/PostView.vue'], resolve),
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
