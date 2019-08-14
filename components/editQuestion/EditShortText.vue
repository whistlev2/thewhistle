<template>
<div class="v-text-field__slot">
  <form action="/store" class="v-form">
    <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
    <input type="hidden" name="questionID" :value="$attrs.question.id" />
    <input type="text" name="title" :value="$attrs.question.title" style="border:1px solid red"/>
    <input type="submit" value="Submit" />
</form>
</div>
</template>
<script>
export default {}
</script>
