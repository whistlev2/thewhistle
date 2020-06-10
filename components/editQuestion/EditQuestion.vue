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
                <v-btn x-large outlined action="" class="blueBtn">Add before</v-btn>
                <v-btn x-large outlined v-on:click="showAfter = true" class="blueBtn">Add after</v-btn>
                <v-btn x-large outlined action="remove" class="blueBtn">Remove question</v-btn>
                    
                <v-select dense outlined v-model="$attrs.question.jump" label="Default question jump:" :items="$attrs.question.jumpOptions" v-on:change="updateQuestionJump" style="padding-left: 10px; padding-top: 30px;" />


                <v-spacer></v-spacer>

                <v-btn v-if="hasChoices" icon @click="show = !show">
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition v-if="hasChoices">
                <div v-show="show">
                    
                    <template>
                        <v-container>
                            <v-row v-for="choice in $attrs.question.properties.choices" :key="choice.ref">
                                <v-col cols="3" md="2">
                                    <div style="padding-top: 15px; text-align: end; padding-right: 20px;">
                                        {{ choice.label }}
                                    </div>
                                </v-col>
                                <v-col cols="9" md="5">
                                    <v-text-field outlined v-model="choice.label"
                                        v-on:change="updateOptionLabel"></v-text-field>
                                </v-col>
                                <v-col cols="6" md="3">
                                    <v-select dense outlined v-model="choice.jump" :items="$attrs.question.jumpOptions"
                                        label="Choice jump" v-on:change="updateOptionJump" item-text="label" item-value="ref" />
                                </v-col>
                                <v-col cols="6" md="2">
                                    <v-btn x-large outlined action="removeOption" class="blueBtn">Remove choice</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6" md="10"> 
                                </v-col>
                                <v-col cols="6" md="2">
                                    <v-btn x-large outlined action="addOption" class="blueBtn">Add option</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </template>
                </div>
            </v-expand-transition>
        </v-card>
        <AddQuestionModal :show="showQuestionModal" @close="closeQuestionModal" :adjacentQuestion="$attrs.question.ref" :beforeQuestion="beforeQuestion" :surveyID="$attrs.surveyID" />
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

export default {
    components: {
        AddQuestionModal
    },
    data() {
        return {
            show: false
        }
    },
    computed: {
        //TODO: Move this to backend';
        jumpOptions: function () {
            const allQuestions = this.$attrs.allQuestions;
            const questionRef = this.$attrs.question.ref;
            let afterQuestion = false;
            let ret = [];
            for (let i = 0; i < allQuestions.length; i++) {
                if (!afterQuestion) {
                    if (allQuestions[i].ref == questionRef) {
                        afterQuestion = true;
                    }
                } else {
                    ret.push(allQuestions[i]);
                }
            }

            return ret;
        },
        hasChoices: function () {
            if (this.$attrs.question.properties && this.$attrs.question.properties.choices) {
                return this.$attrs.question.properties.choices;
            } else {
                return null;
            }
        },
    },
    methods: {
        updateQuestionText() {
            /* <form action="/update-field" class="v-form">
                <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
                <input type="hidden" name="questionID" :value="$attrs.question.id" />
                <input type="text" name="title" :value="$attrs.question.title" style="border:1px solid red; width:500px;"/>
                <input type="submit" value="Submit" />
                </form> */
            
        }
    }
}
</script>
