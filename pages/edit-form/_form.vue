<template>
    <div>
        <h1>Edit Form</h1>
        <EditQuestion v-for="question in form" :question="question" :slug="slug" :key="question.ref" v-on:questionChange="updateForm" />      
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
            //TODO: Edit to allow for multiple sections (currently only shows first section)
            form: context.form[0],
            slug: context.slug
        }
    },
    
    methods: {
        updateForm(form) {
            this.form = form;
        }
    }

}

</script>