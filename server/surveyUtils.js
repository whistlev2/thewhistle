// TODO - NTH move to lower level folder

exports.updateField = function(survey, query) {
  survey.fields.forEach(function(item, i) {
    if(item.id == query.questionID) {
      item.title = query.title
    }
  })
  return survey
}

exports.updateChoice = function(survey, query) {
  survey.fields.forEach(function(question, i) {
    if(question.id == query.questionID) {
      question.properties.choices.forEach(function(choice) {
          if(choice.id == query.choiceID) {
            choice.label = query.label;
          }
      })
    }
  })
  return survey
}

exports.updateDropdownChoice = function(survey, query) {
  survey.fields.forEach(function(question, i) {
    if(question.id == query.questionID) {
      question.properties.choices.forEach(function(choice) {
          if(choice.label == query.oldLabel) {
            choice.label = query.newLabel;
          }
      })
    }
  })
  return survey
}
