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
                <v-btn x-large outlined v-on:click="openRemoveQuestionModal" class="blueBtn">Remove question</v-btn>
                    
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
                                        v-on:change="updateOptionLabel"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="4">
                                    <v-select dense outlined v-model="choice.jump" :items="$attrs.question.jumpOptions"
                                        label="Choice jump" v-on:change="updateOptionJump" item-text="label" item-value="ref" />
                                </v-col>
                                <v-col cols="6" md="2">
                                    <v-btn x-large outlined v-on:click="openRemoveOptionModal(choice)" class="blueBtn">Remove choice</v-btn>
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
        <RemoveQuestionModal :show="showRemoveQuestionModal" @close="closeRemoveQuestionModal" @submit="removeQuestion" :questionText="$attrs.question.title" />
        <AddOptionModal :show="showAddOptionModal" @close="closeAddOptionModal" @submit="addOption" :newOption="newOption" />
        <RemoveOptionModal :show="showRemoveOptionModal" @close="closeRemoveOptionModal" @submit="removeOption" :option="currentOption" />
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
import RemoveQuestionModal from './RemoveQuestionModal.vue';
import AddOptionModal from './AddOptionModal.vue';
import RemoveOptionModal from './RemoveOptionModal.vue';


export default {
    components: {
        AddQuestionModal,
        RemoveQuestionModal,
        AddOptionModal,
        RemoveOptionModal
    },
    data() {
        return {
            showOptions: false,
            addBefore: false,
            showAddQuestionModal: false,
            showRemoveQuestionModal: false,
            showAddOptionModal: false,
            showRemoveOptionModal: false,
            newQuestion: {},
            newOption: {},
            currentOption: {}
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
        updateQuestionText() {
            console.log('Update question text');
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

        addQuestion() {
            console.log('Add Q')
        },

        openRemoveQuestionModal() {
            console.log('Open remove Q')
            this.showRemoveQuestionModal = true;
        },

        closeRemoveQuestionModal() {
            console.log('Close remove Q');
            this.showRemoveQuestionModal = false;
        },

        removeQuestion() {
            console.log('Remove Q')
        },

        updateQuestionJump() {
            console.log('Update question jump')
        },

        updateOptionLabel() {
            console.log('Update option label')
        },

        updateOptionJump() {
            console.log('Update option jump')
        },

        openRemoveOptionModal(option) {
            this.currentOption = option;
            this.showRemoveOptionModal = true;
            console.log('Open remove option')
        },

        closeRemoveOptionModal() {
            this.showRemoveOptionModal = false;
            console.log('Close remove option')
        },

        removeOption() {
            console.log('Remove option')
        },

        openAddOptionModal() {
            this.showAddOptionModal = true;
            console.log('Open add option')
        },

        closeAddOptionModal() {
            this.showAddOptionModal = false;
            console.log('Close add option')
        },

        addOption() {
            console.log('Add option')
        } 

    }
}
</script>
