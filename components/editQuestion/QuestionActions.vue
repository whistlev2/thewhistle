<template>
    <div>
        <QuestionJumpActions :question="$attrs.question" :surveyID="$attrs.surveyID"
            :jumpOptions="$attrs.jumpOptions" />
        <QuestionMainActions :question="$attrs.question" :surveyID="$attrs.surveyID" />
    </div>
</template>
<script>
  import QuestionJumpActions from './QuestionJumpActions.vue';
  import QuestionMainActions from './QuestionMainActions.vue';
  export default {
    components: {
      QuestionJumpActions,
      QuestionMainActions,
    }
  }
</script>