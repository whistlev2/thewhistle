<template>
    <div>
        
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <v-btn outlined :to="`/submit-test-report/${$route.params.form}`" class="blueBtn">View test form</v-btn>
        <v-btn v-if="editJSON.length == 0" x-large outlined v-on:click="openAddSectionModal(0)" class="blueBtn">Add first section</v-btn>
        <v-tabs align-with-title v-model="tab">
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="section in editJSON" :key="section.sectionID">
                {{ section.title }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item v-for="section in editJSON" :key="section.sectionID">
                <EditQuestionSection v-if="section.type == 'Questions'" :section="section" :web="web" />
            </v-tab-item>
        </v-tabs-items>
        <br /><br />
        <!-- TODO: Add multiple sections -->
        <AddSectionModal :show="showAddSectionModal" :newSection="newSection" :web="web" @close="closeAddSectionModal" @submit="addSection" />
    </div>
</template>

<style scoped>
.blueBtn {
    background-color: #50addb;
    color: white;
}
</style>

<script>
import EditQuestionSection from '../../components/editForm/EditQuestionSection.vue';
import AddSectionModal from '../../components/editForm/AddSectionModal.vue';

import axios from 'axios';

export default {
    components: {
        EditQuestionSection,
        AddSectionModal
    },
    
    data() {
        return {
            title: '',
            description: '',
            web: false,
            editJSON: [],
            tab: null,
            showAddSectionModal: false,
            newSection: {
                title: '',
                type: '',
                default: true,
                allReports: true,
                index: 0
            }
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
                this.web = d.data.web;
                this.editJSON = d.data.sectionLogic;
            })
        },

        openAddSectionModal(index) {
            this.newSection = {
                title: '',
                type: '',
                default: true,
                allReports: true,
                index: index
            }
            this.showAddSectionModal = true;
        },

        closeAddSectionModal() {
            this.showAddSectionModal = false;
        },

        addSection() {
            let url = `/api/edit-form/${this.$route.params.form}/add-section`;
            axios.post(url, this.newSection).then((response) => {
                let section = response.data.section;
                section.sectionLogic = { default: this.newSection.default };
                section.title = this.newSection.title;
                section.type = this.newSection.type;
                this.editJSON.splice(this.newSection.index, 0, section);
                //TODO: Handle errors
            });
        }
    }

}

</script>