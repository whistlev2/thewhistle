<template>
    <div>
        <h1>Hi</h1>
            <template v-for="question in survey">
                <EditQuestion :question="question" :surveyID="surveyID" />
            </template>
    </div>
</template>

<script>
import EditQuestion from '../../components/editQuestion/EditQuestion.vue'
export default {
  components: {
    EditQuestion
  },
  asyncData (context) {
    console.log(context);
    return {
      survey: context.survey,
      surveyID: context.surveyID
   }
 }
}
</script>
