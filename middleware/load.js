import axios from 'axios'

import Pages from './pages.ts'

import Lowtech from './lowtech';

export default async function (context) {
    var params = context.route.params;
    var path = context.route.path;

    if (path == '/organisations') {
        context.organisations = await Pages.loadOrganisations();
    }

    if (path == '/forms') {
        context.forms = await Pages.loadForms();
    }

    if (path == '/users') {
        context.users = await Pages.loadUsers();
    }

    if (path.startsWith('/reports') && params.hasOwnProperty('form')) {
        context.reports = await Pages.loadReports(params.form);
    }

    if (path.startsWith('/edit-form/') && params.hasOwnProperty('form')) {
        context.form = await Pages.loadEditForm(params.form);
        context.surveyID = params.form;
        context.allQuestions = Pages.getAllQuestions(context.form);
    }

    if (path.startsWith('/report/') && params.hasOwnProperty('report')) {
        context.report = await Pages.loadReport(params.report);
    }

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
