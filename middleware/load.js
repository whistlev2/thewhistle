import {
    loadReport,
    getTestSurvey,
    extractTestSurvey,
    branchSurvey
} from './testData'

import Lowtech from './lowtech';

export default function (context) {
    var path = context.route.params;
    // console.log(path)

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
      context.survey = extractTestSurvey(getTestSurvey());
        // context.survey = extractTestSurvey(branchSurvey());
    }


    if (path.hasOwnProperty('lowtech')) {
        context.questions = Lowtech.getNextQuestions(path.lowtech);
    }

    return context
}
