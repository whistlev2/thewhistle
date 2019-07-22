import Vue from 'vue';
import Router from 'vue-router';
import Reports from './views/Reports.vue';

import LoadSimpleSurvey from './middleware/LoadSimpleSurvey.js'

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
            path: '/simple',
            name: 'simplesurvey',
            component: (): Promise<any> => import('./views/SimpleSurvey.vue'),
            meta: {
              middleware: LoadSimpleSurvey
            }
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
        },
        {
            path: '/report/:id',
            name: 'report',
            component: (): Promise<any> => import('./views/Report.vue')
        }
    ]
});
