import Vue from 'vue';
import Router from 'vue-router';
import Reports from './views/Reports.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/reports'
        },
        {
            path: '/reports',
            name: 'reports',
            component: Reports
        },
        {
            path: '/survey/:id',
            name: 'survey',
            component: (): Promise<any> => import('./views/Survey.vue')
        },
        {
            path: '/forms',
            name: 'forms',
            component: (): Promise<any> => import('./views/Forms.vue') //TODO: Make this type more specific //Lazy load component
        },
        {
            path: '/users',
            name: 'users',
            component: (): Promise<any> => import('./views/Users.vue') //TODO: Make this type more specific //Lazy load component
        }
    ]
});
