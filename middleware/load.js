import axios from 'axios'

import Pages from './pages.ts'

//import Lowtech from './lowtech';
import { verify } from 'crypto';



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

    if (path.startsWith('/reports') && params.hasOwnProperty('form')) {
        context.reports = await Pages.loadReports(params.form, false);
    }

    if (path.startsWith('/test-reports') && params.hasOwnProperty('form')) {
        context.reports = await Pages.loadReports(params.form, true);
    }

    if (path.startsWith('/errors')) {
        context.errors = await Pages.loadErrors();
    }

    /* if (path.startsWith('/edit-form/') && params.hasOwnProperty('form')) {
        console.log('AM EDITING', params.form);
        //context.form = await Pages.loadEditForm(params.form);
        //context.slug = params.form;
    } */

    // if (path.startsWith('/report/') && params.hasOwnProperty('report')) {
    //     context.report = await Pages.loadReport(params.report);
    // }

    if (path.startsWith('/submit-report/') && params.hasOwnProperty('form')) {
        context.form = await Pages.loadFormFromSlug(params.form, false);
    }

    if (path.startsWith('/submit-test-report/') && params.hasOwnProperty('form')) {
        context.form = await Pages.loadFormFromSlug(params.form, true);
    }

    // TODO - change conditions for path
    if (params.hasOwnProperty('htmlform')) {
        context.survey = extractTestSurvey(getTestSurvey());
    }
    // TODO - change conditions for path
    /* if (params.hasOwnProperty('lowtech')) {
        context.questions = Lowtech.getNextQuestions(params.lowtech);
    } */

    return context
}
