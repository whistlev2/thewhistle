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
            path: '/forms',
            name: 'forms',
            component: (): Promise<any> => //TODO: Make this type more specific
                import('./views/Forms.vue') //Lazy load component
        },
        {
            path: '/users',
            name: 'users',
            component: (): Promise<any> => //TODO: Make this type more specific
                import('./views/Users.vue') //Lazy load component
        },
    ]
});
