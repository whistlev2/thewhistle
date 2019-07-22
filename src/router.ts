import Vue from 'vue';
import Router from 'vue-router';
import Reports from './views/Reports.vue';

import LoadSimpleSurvey from './middleware/LoadSimpleSurvey.js';

Vue.use(Router);

const router = new Router({
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

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters);
    // Than run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
