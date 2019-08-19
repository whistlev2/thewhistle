import {
    loadReport,
    getTestSurvey,
    extractTestSurvey,
    branchSurvey,
    surveyById
} from './testData'

import Lowtech from './lowtech';

export default function (context) {
    var path = context.route.params;

    if (path.hasOwnProperty('reports')) {
        context.responses = loadReport(path.reports);
    }

    if (path.hasOwnProperty('survey')) {
        context.survey = path.survey; //extractTestSurvey(path.survey);
    }

    if (path.hasOwnProperty('htmlform')) {
        context.survey = extractTestSurvey(getTestSurvey());
    }

    if (path.hasOwnProperty('editform')) {
        const id = path.editform;
        context.surveyID = id;
        context.survey = extractTestSurvey(surveyById(id));

    }


    if (path.hasOwnProperty('lowtech')) {
        context.questions = Lowtech.getNextQuestions(path.lowtech);
    }

    return context
}
