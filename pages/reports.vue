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

export default {
  asyncData (context) {
    var headers = []
    var answers = []
    _.each(context.responses[0].definition.fields, function(field) { headers.push({text: field.title, value: field.id})});

    _.each(context.responses, function(response) {
      var res = {}
      _.each(headers, function(col) {
        res[col.value] = 33 // Function to lookup the value from the ID
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
