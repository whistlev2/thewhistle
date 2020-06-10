<template>
    <div>
        <h1>Edit Form</h1>
        <EditQuestion v-for="question in form" :question="question" :surveyID="surveyID" :key="question.ref" />      
    </div>
</template>

<script>
// TODO - L - Form editing
import EditQuestion from '../../components/editQuestion/EditQuestion.vue'
export default {
    components: {
        EditQuestion
    },
    asyncData(context) {
        return {
            form: context.form,
            surveyID: context.surveyID
        }
    },

}

</script>