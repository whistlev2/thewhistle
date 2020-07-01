<template>
    <div>
        <v-card style="padding: 50px; margin: 10px">
            <v-card-title>
                <v-text-field :label="$attrs.question.ref" outlined v-model="$attrs.question.title"
                    v-on:change="updateQuestionText"></v-text-field>
            </v-card-title>
            <v-row>
                <v-col cols="12" md="4">
                    Question type: {{ $attrs.question.type }}
                </v-col>
                <v-col cols="12" md="8" v-if="$attrs.question.jumps.length > 0">
                    Can jump to {{ $attrs.question.jumps.join(', ') }}
                </v-col>
            </v-row>
            <v-card-actions>
                <v-btn x-large outlined v-on:click="openAddBeforeQuestionModal" class="blueBtn">Add before</v-btn>
                <v-btn x-large outlined v-on:click="openAddAfterQuestionModal" class="blueBtn">Add after</v-btn>
                <v-btn x-large outlined v-on:click="openDeleteQuestionModal" class="blueBtn">Delete question</v-btn>
                    
                <v-select dense outlined v-model="$attrs.question.jump" label="Default question jump:" :items="$attrs.question.jumpOptions" v-on:change="updateQuestionJump" style="padding-left: 10px; padding-top: 30px;" />


                <v-spacer></v-spacer>

                <v-btn v-if="$attrs.question.choices" icon @click="showOptions = !showOptions">
                    <v-icon>{{ showOptions ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition v-if="$attrs.question.choices">
                <div v-show="showOptions">
                    
                    <template>
                        <v-container>
                            <v-row v-for="choice in $attrs.question.choices" :key="choice.ref">
                                <v-col cols="12" md="6">
                                    <v-text-field outlined v-model="choice.label"
                                        v-on:change="updateOptionLabel(choice)"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="4">
                                    <v-select dense outlined v-model="choice.jump" :items="$attrs.question.jumpOptions"
                                        label="Choice jump" v-on:change="updateOptionJump(choice)" item-text="label" item-value="ref" />
                                </v-col>
                                <v-col cols="6" md="2">
                                    <v-btn x-large outlined v-on:click="openDeleteOptionModal(choice)" class="blueBtn">Remove choice</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6" md="10"> 
                                </v-col>
                                <v-col cols="6" md="2">
                                    <v-btn x-large outlined v-on:click="openAddOptionModal" class="blueBtn">Add option</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>
                </div>
            </v-expand-transition>
        </v-card>
        <AddQuestionModal :show="showAddQuestionModal" @close="closeAddQuestionModal" @submit="addQuestion" :newQuestion="newQuestion" />
        <DeleteQuestionModal :show="showDeleteQuestionModal" @close="closeDeleteQuestionModal" @submit="deleteQuestion" :questionText="$attrs.question.title" />
        <AddOptionModal :show="showAddOptionModal" @close="closeAddOptionModal" @submit="addOption" :newOption="newOption" />
        <DeleteOptionModal :show="showDeleteOptionModal" @close="closeDeleteOptionModal" @submit="deleteOption" :option="optionToDelete" />
    </div>
</template>
<style scoped>
.blueBtn {
    background-color: #50addb;
    color: white;
}
</style>
<script>
// import { Component, Vue } from 'vue-property-decorator'

import AddQuestionModal from './AddQuestionModal.vue';
import DeleteQuestionModal from './DeleteQuestionModal.vue';
import AddOptionModal from './AddOptionModal.vue';
import DeleteOptionModal from './DeleteOptionModal.vue';

import axios from 'axios';


export default {
    components: {
        AddQuestionModal,
        DeleteQuestionModal,
        AddOptionModal,
        DeleteOptionModal
    },
    data() {
        return {
            showOptions: false,
            addBefore: false,
            showAddQuestionModal: false,
            showDeleteQuestionModal: false,
            showAddOptionModal: false,
            showDeleteOptionModal: false,
            newQuestion: {},
            newOption: {},
            optionToDelete: {}
        }
    },
    computed: {
        hasChoices: function () {
            if (this.$attrs.question) {
                return this.$attrs.question.choices ? true : false;
            } else {
                return false;
            }
        },
    },
    methods: {
        emitToParent(form) {
            this.$emit('questionChange', form);
        },

        openAddOptionModal() {
            this.showAddOptionModal = true;
            console.log('Open add option')
        },

        closeAddOptionModal() {
            this.showAddOptionModal = false;
            console.log('Close add option')
        },

        openDeleteOptionModal(option) {
            this.optionToDelete = option;
            this.showDeleteOptionModal = true;
            console.log('Open remove option')
        },

        closeDeleteOptionModal() {
            this.showDeleteOptionModal = false;
            console.log('Close remove option')
        },

        openAddBeforeQuestionModal() {
            console.log('Open before')
            this.openAddQuestionModal(true);
        },

        openAddAfterQuestionModal() {
            console.log('Open after')
            this.openAddQuestionModal(false);
        },

        openAddQuestionModal(addBefore) {
            this.addBefore = addBefore;
            this.showAddQuestionModal = true;
            console.log('Open add Q')
        },

        closeAddQuestionModal() {
            this.showAddQuestionModal = false;
            console.log('Close add Q')
        },

        openDeleteQuestionModal() {
            console.log('Open remove Q')
            this.showDeleteQuestionModal = true;
        },

        closeDeleteQuestionModal() {
            console.log('Close remove Q');
            this.showDeleteQuestionModal = false;
        },

        updateQuestionText() {
            console.log('Update question text');
            let url = `/api/edit-form/${this.$attrs.slug}/update-question-title/${this.$attrs.question.ref}`;
            let data = {
                title: this.$attrs.question.title
            };
            axios.patch(url, data).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },
        
        addQuestion() {
            console.log('Add Q')
            let url = `/api/edit-form/${this.$attrs.slug}/add-question/${this.$attrs.question.ref}`;
            let data = {
                before: this.addBefore,
                question: this.newQuestion
            };
            axios.post(url, data).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        deleteQuestion() {
            console.log('Remove Q')
            let url = `/api/edit-form/${this.$attrs.slug}/delete-question/${this.$attrs.question.ref}`;
            axios.delete(url).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        updateQuestionJump() {
            console.log('Update question jump')
            let url = `/api/edit-form/${this.$attrs.slug}/update-question-jump/${this.$attrs.question.ref}`;
            let data = {
                jump: this.$attrs.question.jump
            };
            axios.patch(url, data).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        addOption() {
            console.log('Add option')
            let url = `/api/edit-form/${this.$attrs.slug}/add-option/${this.$attrs.question.ref}`;
            let data = {
                option: this.newOption
            };
            axios.post(url, data).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        updateOptionLabel(choice) {
            console.log('Update option label')
            let url = `/api/edit-form/${this.$attrs.slug}/update-option-label/${this.$attrs.question.ref}/${choice.ref}`;
            let data = {
                label: choice.label
            };
            axios.patch(url, data).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        updateOptionJump(choice) {
            console.log('Update option jump')
            let url = `/api/edit-form/${this.$attrs.slug}/update-option-jump/${this.$attrs.question.ref}/${choice.ref}`;
            let data = {
                jump: choice.jump
            };
            axios.patch(url, data).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        deleteOption(choiceRef) {
            console.log('Remove option')
            let url = `/api/edit-form/${this.$attrs.slug}/delete-option/${this.$attrs.question.ref}/${choiceRef}`;

            axios.delete(url).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        }

    }
}
</script>
