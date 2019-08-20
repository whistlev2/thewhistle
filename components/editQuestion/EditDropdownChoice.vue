<template>
<div class="v-text-field__slot">
  <form action="/update-dropdown-choice" class="v-form">
    <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
    <input type="hidden" name="questionID" :value="$attrs.questionID" />
    <input type="hidden" name="oldLabel" :value="$attrs.choice.label" />
    <input type="text" name="newLabel" :value="$attrs.choice.label" style="border:1px solid red"/>
    <input type="submit" value="Submit" />
</form>
</div>
</template>
<script>
export default {}
</script>
