exports.updateField = function(survey, query) {
  survey.fields.forEach(function(item, i) {
    if(item.id == query.questionID) {
      item.title = query.title
    }
  })
  return survey
}
