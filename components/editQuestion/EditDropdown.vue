<template>
<div class="v-text-field__slot">
  <form action="/update-field" class="v-form">
    <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
    <input type="hidden" name="questionID" :value="$attrs.question.id" />
    <input type="text" name="title" :value="$attrs.question.title" style="border:1px solid red; width:500px;"/>
    <input type="submit" value="Submit" />
  </form>
  <br>
  <h3>Edit options</h3>
  <v-btn action="addChoice">Add option</v-btn>
  <br><br>
  <EditDropdownChoice v-for="choice in $attrs.question.properties.choices" :surveyID="$attrs.surveyID" :question="$attrs.question" :jumpOptions="$attrs.jumpOptions" :choice="choice" :key="choice.label" />
</div>
</template>
<script>
import EditDropdownChoice from './EditDropdownChoice.vue';
export default {
  components: {
    EditDropdownChoice
  }
}
</script>
