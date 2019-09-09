import axios from 'axios'

import {
    loadReports,
    getTestSurvey,
    extractTestSurvey,
    branchSurvey,
    surveyById,
    loadOrganisations,
    loadForms
} from './testData'

import Pages from './pages.ts'

import Lowtech from './lowtech';

export default function (context) {
    var params = context.route.params;
    var path = context.route.path;

    if (path == '/organisations') {
        context.responses = Pages.loadOrganisations();
    }
    
    if (path == '/reports') {
        context.responses = Pages.loadReports();
    }

    if (path == '/forms') {
        context.responses = Pages.loadForms();
    }

    if (path == '/users') {
        context.responses = Pages.loadUsers();
    }

    if (params.hasOwnProperty('survey')) {
        context.survey = params.survey; //extractTestSurvey(params.survey);
    }

    if (params.hasOwnProperty('htmlform')) {
        context.survey = extractTestSurvey(getTestSurvey());
    }

    if (params.hasOwnProperty('editform')) {
        const id = params.editform;
        context.surveyID = id;
        axios.get('http://localhost:3000/surveyjson').then(function(v){
          context.survey = v;
          return context
        })
        // context.survey = extractTestSurvey(surveyById(id));

    }

    if (params.hasOwnProperty('lowtech')) {
        context.questions = Lowtech.getNextQuestions(params.lowtech);
    }

    return context
}
