<template>
    <div>
        <h1>Edit Survey</h1>
            <template v-for="question in survey">
                <EditQuestion :question="question" :surveyID="surveyID" />
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
    return axios.get(`http://localhost:3000/surveyjson/${context.surveyID}`).then(function(res){
      return {
        survey: res.data,        
        surveyID: context.surveyID

      }
    })
 }
}
</script>
