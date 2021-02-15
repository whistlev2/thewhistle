<template>
    <div>
        <template v-if="$attrs.section.questions.length == 0">
            <v-btn x-large outlined v-on:click="openAddQuestionModal" class="blueBtn">Add first question</v-btn>
            <AddQuestionModal :show="showAddQuestionModal" :web="web" @close="closeAddQuestionModal" @submit="addQuestion" :newQuestion="newQuestion" :allRefs="allRefs" />
        </template>
        <EditQuestion v-for="question in $attrs.section.questions" :sectionID="$attrs.section.sectionID" :question="question" :web="web" :key="question.ref" v-on:questionChange="updateEditJSON" :allRefs="allRefs" />
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
import EditQuestion from './EditQuestion.vue'
import AddQuestionModal from './AddQuestionModal.vue';

import axios from 'axios';

export default {
    components: {
        EditQuestion,
        AddQuestionModal
    },
    
    data() {
        return {
            showAddQuestionModal: false
        }
    },

    computed: {
        allRefs: function () {
            return this.$attrs.section.map(q => q.ref);
        }
    },

    methods: {

        addQuestion() {
            let url = `/api/edit-form/${this.sectionID}/add-first-question`;
            let data = {
                question: this.newQuestion
            };
            axios.post(url, data).then((response) => {
                this.updateEditJSON(response.data.form);  
                //TODO: Handle errors
            });
        },

        onFormChange(form) {
            this.$emit('formChange', form);
        },

        openAddQuestionModal() {
            this.showAddQuestionModal = true;
        },

        closeAddQuestionModal() {
            this.showAddQuestionModal = false;
        }
    }

}
</script>
