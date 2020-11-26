<template>
    <div>
        <v-card style="padding: 50px; margin: 10px">
            <v-form v-model="valid">
                <v-card-title>
                    <v-text-field :label="$attrs.question.ref" outlined v-model="$attrs.question.title"
                        v-on:change="updateQuestionText" :rules="validText"></v-text-field>
                </v-card-title>
                <v-row>
                    <v-col cols="12" md="6">
                        Question type: {{ $attrs.question.type }}
                    </v-col>
                    <v-col cols="12" md="6" v-if="$attrs.question.jumps.length > 0">
                        Can jump to {{ $attrs.question.jumps.join(', ') }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-switch v-model="$attrs.question.required" class="ma-2"
                            label="Required?" v-on:change="updateRequired"></v-switch>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-switch v-model="showDescription" class="ma-2"
                            label="Show question description?" v-on:change="updateShowDescription"></v-switch>
                    </v-col>
                </v-row>
                <v-row v-if="multipleChoice">
                    <v-col cols="12" md="6">
                        <v-switch v-model="$attrs.question.allowMultiple" class="ma-2"
                            label="Allow user to select multiple options?" v-on:change="updateAllowMultiple"></v-switch>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-switch v-model="$attrs.question.allowOther" class="ma-2"
                            label="Other option?" v-on:change="updateAllowOther"></v-switch>
                    </v-col>
                </v-row>
                <v-row v-if="showDescription">
                    <v-col cols="12" md="6">
                        <v-text-field outlined v-model="$attrs.question.description" label="Description" v-on:change="updateDescription"></v-text-field>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-btn x-large outlined v-on:click="openAddBeforeQuestionModal" class="blueBtn">Add before</v-btn>
                    <v-btn x-large outlined v-on:click="openAddAfterQuestionModal" class="blueBtn">Add after</v-btn>
                    <v-btn x-large outlined v-on:click="openDeleteQuestionModal" class="blueBtn">Delete question</v-btn>
                        
                    <v-select dense outlined v-model="$attrs.question.jump" label="Default question jump:" :items="$attrs.question.jumpOptions" v-on:change="updateQuestionJump" style="padding-left: 10px; padding-top: 30px;" />


                    <v-spacer></v-spacer>

                    <v-btn v-if="multipleChoice" text @click="showOptions = !showOptions">
                        Show options <v-icon>{{ showOptions ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-form>
            <v-expand-transition v-if="multipleChoice">
                <div v-show="showOptions">
                    <template>
                        <v-container>
                            <v-row v-for="choice in $attrs.question.choices" :key="choice.ref">
                                <v-col cols="12" md="6">
                                    <v-text-field outlined v-model="choice.label" :label="choice.ref" disabled></v-text-field>
                                </v-col>
                                <v-col cols="6" md="4">
                                    <v-select dense outlined v-model="choice.jump" :items="$attrs.question.jumpOptions"
                                        label="Option jump" v-on:change="updateOptionJump(choice)" item-text="label" item-value="ref" />
                                </v-col>
                                <v-col cols="6" md="2" v-if="$attrs.question.choices.length > 1">
                                    <v-btn x-large outlined v-on:click="openDeleteOptionModal(choice)" class="blueBtn">Remove option</v-btn>
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
        <AddQuestionModal :show="showAddQuestionModal" :web="$attrs.web" @close="closeAddQuestionModal" @submit="addQuestion" :newQuestion="newQuestion" :allRefs="$attrs.allRefs" />
        <DeleteQuestionModal :show="showDeleteQuestionModal" :web="$attrs.web" @close="closeDeleteQuestionModal" @submit="deleteQuestion" :questionText="$attrs.question.title" />
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
            newQuestion: {
                type: '',
                ref: '',
                title: '',
                optionRef: '',
            },
            newOption: {},
            optionToDelete: {},
            valid: false,
            validText: [ v => !!v || 'Required' ],
            showDescription: false
        }
    },
    computed: {
        multipleChoice: function () {
            return this.$attrs.question.type == 'dropdown' || this.$attrs.question.type == 'multiple_choice';
        }
    },
    mounted() {
        this.showDescription = this.$attrs.question.description ? true : false;
    },
    methods: {
        emitToParent(form) {
            this.$emit('questionChange', form);
        },

        openAddOptionModal() {
            this.showAddOptionModal = true;
        },

        closeAddOptionModal() {
            this.showAddOptionModal = false;
        },

        openDeleteOptionModal(option) {
            this.optionToDelete = option;
            this.showDeleteOptionModal = true;
        },

        closeDeleteOptionModal() {
            this.showDeleteOptionModal = false;
        },

        openAddBeforeQuestionModal() {
            this.openAddQuestionModal(true);
        },

        openAddAfterQuestionModal() {
            this.openAddQuestionModal(false);
        },

        openAddQuestionModal(addBefore) {
            this.addBefore = addBefore;
            this.showAddQuestionModal = true;
        },

        closeAddQuestionModal() {
            this.showAddQuestionModal = false;
        },

        openDeleteQuestionModal() {
            this.showDeleteQuestionModal = true;
        },

        closeDeleteQuestionModal() {
            this.showDeleteQuestionModal = false;
        },

        updateQuestionText() {
            if (this.$attrs.question.title.length > 0) {
                let url = `/api/edit-form/${this.$attrs.sectionID}/update-question-title/${this.$attrs.question.ref}`;
                let data = {
                    title: this.$attrs.question.title
                };
                axios.patch(url, data).then((response) => {
                    this.emitToParent(response.data.form);  
                    //TODO: Handle errors
                });
            }
        },
        
        addQuestion() {
            let url = `/api/edit-form/${this.$attrs.sectionID}/add-question/${this.$attrs.question.ref}`;
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
            let url = `/api/edit-form/${this.$attrs.sectionID}/delete-question/${this.$attrs.question.ref}`;
            axios.delete(url).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        updateQuestionJump() {
            let url = `/api/edit-form/${this.$attrs.sectionID}/update-question-jump/${this.$attrs.question.ref}`;
            let data = {
                jump: this.$attrs.question.jump
            };
            axios.patch(url, data).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        addOption() {
            let url = `/api/edit-form/${this.$attrs.sectionID}/add-option/${this.$attrs.question.ref}`;
            let data = {
                option: this.newOption
            };
            axios.post(url, data).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        updateOptionJump(choice) {
            let url = `/api/edit-form/${this.$attrs.sectionID}/update-option-jump/${this.$attrs.question.ref}/${choice.ref}`;
            let data = {
                jump: choice.jump
            };
            axios.patch(url, data).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        deleteOption(choiceRef) {
            let url = `/api/edit-form/${this.$attrs.sectionID}/delete-option/${this.$attrs.question.ref}/${choiceRef}`;

            axios.delete(url).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        updateRequired() {
            let url = `/api/edit-form/${this.$attrs.sectionID}/update-required/${this.$attrs.question.ref}`;
            let data = {
                required: this.$attrs.question.required
            };
            axios.patch(url, data).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        updateShowDescription() {
            if (!this.showDescription) {
                let url = `/api/edit-form/${this.$attrs.sectionID}/delete-description/${this.$attrs.question.ref}`;

                axios.delete(url).then((response) => {
                    this.emitToParent(response.data.form);  
                    //TODO: Handle errors
                });
            }
        },

        updateAllowMultiple() {
            let url = `/api/edit-form/${this.$attrs.sectionID}/update-allow-multiple/${this.$attrs.question.ref}`;
            let data = {
                allowMultiple: this.$attrs.question.allowMultiple
            };
            axios.patch(url, data).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        updateAllowOther() {
            let url = `/api/edit-form/${this.$attrs.sectionID}/update-allow-other/${this.$attrs.question.ref}`;
            let data = {
                allowOther: this.$attrs.question.allowOther
            };
            axios.patch(url, data).then((response) => {
                this.emitToParent(response.data.form);  
                //TODO: Handle errors
            });
        },

        updateDescription() {
            if (this.$attrs.question.description.length > 0) {
                let url = `/api/edit-form/${this.$attrs.sectionID}/update-description/${this.$attrs.question.ref}`;
                let data = {
                    description: this.$attrs.question.description
                };
                axios.patch(url, data).then((response) => {
                    this.emitToParent(response.data.form);  
                    //TODO: Handle errors
                });
            }
        }

    }
}
</script>
