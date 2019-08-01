<template>
  <v-data-table
  :headers="headers"
  :items="body"
  :items-per-page="5"
  class="elevation-1"
></v-data-table>
</template>


<script>
var _ = require('underscore');

function getVal(res, id) {
  var answer = _.filter(res.answers, function(answer) { return answer.field.id == id });
  answer = answer[0]
  switch (answer.type) {
    case 'number':
      return answer.number;
      break;
    case 'choice':
      return answer.choice.label;
      break;
    case 'text':
      return answer.text;
      break;
    default:
      "--"
  }
}

export default {
  asyncData (context) {
    var headers = []
    var answers = []
    _.each(context.responses[0].definition.fields, function(field) { headers.push({text: field.title, value: field.id})});

    _.each(context.responses, function(response) {
      var res = {}
      _.each(headers, function(col) {
        res[col.value] = getVal(response, col.value); 
      })
      answers.push(res)
    })

    return {
      headers: headers,
      body: answers
    }
  },
  fetch () {
  },
  head () {
    // Set Meta Tags for this Page
  },
  // and more functionality to discover

}
</script>
