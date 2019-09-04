<template>
<div class="v-text-field__slot">
  <form action="/update-choice" class="v-form">
    <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
    <input type="hidden" name="questionID" :value="$attrs.question.id" />
    <input type="hidden" name="choiceID" :value="$attrs.choice.id" />
    <input type="text" name="label" :value="$attrs.choice.label" style="border:1px solid red"/>
    <input type="submit" value="Submit" />
  </form>
  <ChoiceActions :question="$attrs.question" :surveyID="$attrs.surveyID" :choice="$attrs.choice.ref" :jumpOptions="$attrs.jumpOptions" />
</div>
</template>
<script>
import ChoiceActions from './ChoiceActions.vue';
export default {
  components: {
    ChoiceActions
  }
}
</script>
