<template>
<div class="v-text-field__slot">
  <form action="/update-choice" class="v-form">
    <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
    <input type="hidden" name="questionID" :value="$attrs.questionID" />
    <input type="hidden" name="choiceID" :value="$attrs.choice.id" />
    <input type="text" name="label" :value="$attrs.choice.label" style="border:1px solid red"/>
    <input type="submit" value="Submit" />
</form>
</div>
</template>
<script>
export default {}
</script>
