<template>
<div class="v-text-field__slot">
  <form action="/update-field" class="v-form">
    <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
    <input type="hidden" name="questionID" :value="$attrs.question.id" />
    <input type="text" name="title" :value="$attrs.question.title" style="border:1px solid red"/>
    <input type="submit" value="Submit" />
</form>
  <br>
  <h3>Edit options</h3>
  <v-btn action="addChoice">Add option</v-btn>
  <br><br>
  <EditChoice v-for="choice in $attrs.question.properties.choices" :surveyID="$attrs.surveyID" :question="$attrs.question" :jumpOptions="$attrs.jumpOptions" :choice="choice" :key="choice.ref"/>
</div>
</template>
<script>
import EditChoice from './EditChoice.vue';
export default {
  components: {
    EditChoice,
  }
}
</script>
