<template>
    <div>
        <h1>Edit Survey</h1>
            <template v-for="question in survey">
                <EditQuestion :question="question" :surveyID="surveyID" :key="question.ref" :allQuestions="allQuestions"/>
            </template>
    </div>
</template>



<script>
import axios from 'axios'
import EditQuestion from '../../components/editQuestion/EditQuestion.vue'
export default {
  components: {
    EditQuestion
  },
  // middleware: 'survey',
  asyncData (context) {
    return axios.get(`http://localhost:3000/formjson/${context.surveyID}`).then(function(res) {
      const allQuestions = getAllQuestions(res.data);
      return {
        survey: res.data,        
        surveyID: context.surveyID,
        allQuestions: allQuestions
      }
    });
  },
}

function getAllQuestions(survey) {
  let ret = [];
  for (let i = 0; i < survey.length; i++) {
    ret[i] = {
      ref: survey[i].ref,
      text: survey[i].title
    };
  }
  return ret;
}
</script>
