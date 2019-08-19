<template>
    <div>
        <h1>Hello {{ welcome }}</h1>
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
  middleware: 'survey',
  asyncData (context) {
    const survey = context.hasOwnProperty('survey') ? context.survey.data : [];
    console.log(survey);
    return {
      welcome: "Hello",
      survey: survey,
      surveyID: context.surveyID
   }
 }
}
</script>
