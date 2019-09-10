import axios from 'axios'

import {
    loadReports,
    getTestSurvey,
    extractTestSurvey,
    branchSurvey,
    surveyById,
    loadOrganisations,
    loadForms,
    loadEditForm
} from './testData'

import Pages from './pages.ts'

import Lowtech from './lowtech';

export default async function (context) {
    var params = context.route.params;
    var path = context.route.path;

    if (path == '/organisations') {
        context.organisations = await Pages.loadOrganisations();
    }
    
    if (path == '/reports') {
        context.reports = await Pages.loadReports();
    }

    if (path == '/forms') {
        context.forms = await Pages.loadForms();
    }

    if (path == '/users') {
        context.users = await Pages.loadUsers();
    }

    if (path.startsWith('/edit-form/') && params.hasOwnProperty('form')) {
        context.form = await Pages.loadEditForm(params.form);
        context.surveyID = params.form;
        context.allQuestions = Pages.getAllQuestions(context.form);
    }

    if (params.hasOwnProperty('survey')) {
        context.survey = params.survey; //extractTestSurvey(params.survey);
    }

    if (params.hasOwnProperty('htmlform')) {
        context.survey = extractTestSurvey(getTestSurvey());
    }

    if (params.hasOwnProperty('lowtech')) {
        context.questions = Lowtech.getNextQuestions(params.lowtech);
    }

    return context
}
