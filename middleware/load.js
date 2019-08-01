import {loadReport, extractTestSurvey} from './testData'

export default function (context) {
  var path = context.route.params;
  console.log(path)

  if(path.hasOwnProperty('reports')) {
    context.responses = loadReport(path.reports);
  }

  if(path.hasOwnProperty('survey')) {
    context.survey = path.survey;//extractTestSurvey(path.survey);
  }

  if(path.hasOwnProperty('htmlform')) {
    context.survey = extractTestSurvey(path.survey);
  }

  return context
}
