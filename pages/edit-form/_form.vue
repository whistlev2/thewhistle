<template>
    <div>
        
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
        <v-btn outlined :to="`/submit-test-report/${$route.params.form}`" class="blueBtn">View test form</v-btn>
        <v-btn v-if="editJSON.length == 0" x-large outlined v-on:click="openAddSectionModal(0)" class="blueBtn">Add first section</v-btn>
        <br><br>
        
        <v-tabs align-with-title v-model="currentTab" @change="changeTab">
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tab v-for="tab in tabs" :key="tab.key">
                <template v-if="tab.isSection">
                    {{ tab.title }}
                </template>
                <template v-else>
                    <v-icon>mdi-plus-circle</v-icon>
                </template>
                
            </v-tab>
            <v-tabs-items v-model="currentTab">
                <v-tab-item v-for="tab in tabs" :key="tab.key">
                    <EditQuestionSection v-if="tab.isSection && tab.section.type == 'Questions'" :section="tab.section" :web="tab.web" />
                </v-tab-item>
            </v-tabs-items>
        </v-tabs>
        
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
            currentTab: null,
            showAddSectionModal: false,
            newSection: {
                title: '',
                type: '',
                default: true,
                allReports: true,
                index: 0
            },
            currentSection: null
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
                this.currentTab = this.editJSON.length > 0 ? 1 : 0;
                this.currentSection = this.currentTab;
            })
        },

        openAddSectionModal(index) {
            console.log('ADDDDD', index)
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
            this.currentTab = this.currentSection;
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
        },

        changeTab(tabIndex) {
            if (!this.tabs[tabIndex].isSection) {
                this.openAddSectionModal(this.tabs[tabIndex].index);
            } else {
                this.currentSection = tabIndex;
            }
        }
    },

    computed: {
        tabs: function () {
            let ret = [{
                isSection: false,
                key: 0,
                index: 0
            }];
            for (let i = 0; i < this.editJSON.length; i++) {
                ret.push({
                    isSection: true,
                    key: this.editJSON[i].sectionID,
                    title: this.editJSON[i].title,
                    section: this.editJSON[i]
                });
                ret.push({
                    isSection: false,
                    key: 'addsection' + (i + 1),
                    index: i + 1
                });
            }

            return ret;
        }
    }

}

</script>