<template>
<div class="v-text-field__slot">
  <form action="/update-field" class="v-form">
    <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
    <input type="hidden" name="questionID" :value="$attrs.question.id" />
    <input type="text" name="title" :value="$attrs.question.title" style="border:1px solid red"/>
    <input type="submit" value="Submit" />
</form>
  <h3>Edit options</h3>
  <EditDropdownChoice v-for="choice in $attrs.question.properties.choices" :surveyID="$attrs.surveyID" :questionID="$attrs.question.id" :choice="choice" :key="choice.label" />
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
