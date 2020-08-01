<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <!-- TODO: Add multiple sections -->
        <template v-if="editJSON.length == 0">
            <v-btn x-large outlined v-on:click="openAddQuestionModal" class="blueBtn">Add first question</v-btn>
            <AddQuestionModal :show="showAddQuestionModal" @close="closeAddQuestionModal" @submit="addQuestion" :newQuestion="newQuestion" />
        </template>
        <EditQuestion v-for="question in editJSON" :sectionID="sectionID" :question="question" :key="question.ref" v-on:questionChange="updateEditJSON" />      
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
import AddQuestionModal from '../../components/editQuestion/AddQuestionModal.vue';

import axios from 'axios';

export default {
    components: {
        EditQuestion,
        AddQuestionModal
    },
    
    data() {
        return {
            showAddQuestionModal: false,
            newQuestion: {},
            title: '',
            description: '',
            editJSON: {},
            sectionID: 0
        }
    },

    created() {
        this.fetchData();
        //TODO: Move to async data?
    },

    methods: {
        fetchData() {
            const url = '/api/edit-form/' + this.$route.params.form;
            axios.get(url).then((d) => {
                this.title = d.data.title;
                this.description = d.data.description;
                this.editJSON = d.data.sectionLogic[0].editJSON;
                this.sectionID = d.data.sectionLogic[0].sectionID;
            })
        },

        addQuestion() {
            let url = `/api/edit-form/${this.sectionID}/add-first-question`;
            let data = {
                question: this.newQuestion
            };
            axios.post(url, data).then((response) => {
                this.updateEditLogic(response.data.form);  
                //TODO: Handle errors
            });
        },

        updateEditLogic(editLogic) {
            this.editLogic = editLogic;
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