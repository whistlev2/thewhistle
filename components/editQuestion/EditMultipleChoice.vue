<template>
<div class="v-text-field__slot">
  <form action="/update-field" class="v-form">
    <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
    <input type="hidden" name="questionID" :value="$attrs.question.id" />
    <input type="text" name="title" :value="$attrs.question.title" style="border:1px solid red"/>
    <input type="submit" value="Submit" />
</form>
  <h3>Edit options</h3>
  <EditChoice v-for="choice in $attrs.question.properties.choices" :surveyID="$attrs.surveyID" :questionID="$attrs.question.id" :choice="choice" :key="$attrs.question.properties.choices.id"/>
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
