<template>
    <div>
        <h1>Edit Survey</h1>
        <template v-for="question in form">
            <EditQuestion :question="question" :surveyID="surveyID" :key="question" />
        </template>
    </div>
</template>



<script>
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
    }
}
</script>
