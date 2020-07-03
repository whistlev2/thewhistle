import axios from 'axios'

import Pages from './pages.ts'

import Lowtech from './lowtech';
import { verify } from 'crypto';

const jwt = require('jsonwebtoken');


function requiresVerification(path) {
    return path != '/login';
}

export default async function (context) {
    var params = context.route.params;
    var path = context.route.path;

    // if (path == '/forms') {
    //     var user = context.req.user
    //     context.forms = await Pages.loadForms(user);
    // }

    // if (path == '/users') {
    //     context.users = await Pages.loadUsers();
    // }

    if (requiresVerification(path)) {
        console.log('Verifying')
        try {
            console.log('About to check')
            const payload = await jwt.verify(context.store.$auth.user.token, process.env.JWT_SECRET_KEY);
            console.log('Checked out')
            if (!payload.user) {
                console.log('Redirecting 1')
                context.redirect('/login');
            }
        } catch {
            console.log('Redirecting 2')
            context.redirect('/login');
        }
        console.log('Checking out')
    }
    console.log('Carrying on')

    if (path.startsWith('/reports') && params.hasOwnProperty('form')) {
        context.reports = await Pages.loadReports(params.form);
    }

    if (path.startsWith('/edit-form/') && params.hasOwnProperty('form')) {
        context.form = await Pages.loadEditForm(params.form);
        context.slug = params.form;
    }

    // if (path.startsWith('/report/') && params.hasOwnProperty('report')) {
    //     context.report = await Pages.loadReport(params.report);
    // }

    if (path.startsWith('/survey/') && params.hasOwnProperty('survey')) {
        context.form = await Pages.loadFormFromSlug(params.survey);
    }

    // TODO - change conditions for path
    if (params.hasOwnProperty('htmlform')) {
        context.survey = extractTestSurvey(getTestSurvey());
    }
    // TODO - change conditions for path
    if (params.hasOwnProperty('lowtech')) {
        context.questions = Lowtech.getNextQuestions(params.lowtech);
    }

    return context
}
