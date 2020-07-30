<template>
    <div>
        <h1>Edit Form</h1>
        <template v-if="form.length == 0">
            <v-btn x-large outlined v-on:click="openAddQuestionModal" class="blueBtn">Add first question</v-btn>
            <AddQuestionModal :show="showAddQuestionModal" @close="closeAddQuestionModal" @submit="addQuestion" :newQuestion="newQuestion" />
        </template>
        <EditQuestion v-for="question in form" :question="question" :slug="slug" :key="question.ref" v-on:questionChange="updateForm" />      
    </div>
</template>

<style scoped>
.blueBtn {
    background-color: #50addb;
    color: white;
}
</style>

<script>
// TODO - L - Form editing
import EditQuestion from '../../components/editQuestion/EditQuestion.vue'
import AddQuestionModal from './AddQuestionModal.vue';

export default {
    components: {
        EditQuestion,
        AddQuestionModal
    },

    asyncData(context) {
        return {
            //TODO: Edit to allow for multiple sections (currently only shows first section)
            form: context.form[0],
            slug: context.slug
        }
    },
    
    data() {
        return {
            showAddQuestionModal: false,
            newQuestion: {}
        }
    },

    methods: {
        addQuestion() {
            let url = `/api/edit-form/${this.$attrs.slug}/add-first-question`;
            let data = {
                before: this.addBefore,
                question: this.newQuestion
            };
            axios.post(url, data).then((response) => {
                this.updateForm(response.data.form);  
                //TODO: Handle errors
            });
        },

        updateForm(form) {
            this.form = form;
        },

        openAddOptionModal() {
            this.showAddOptionModal = true;
        },

        closeAddOptionModal() {
            this.showAddOptionModal = false;
        }
    }

}

</script>