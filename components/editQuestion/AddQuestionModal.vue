<template>
    <v-row justify="center">
        <v-dialog v-model="$attrs.show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Add question</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-form ref="form" v-model="valid">
                                <v-col cols="12">
                                    <v-text-field v-model="questionText" :rules="notBlank" label="Question text" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select v-model="questionType" :rules="notBlank"
                                        :items="['Short text', 'Long text', 'Multiple choice', 'Dropdown', 'Date', 'File upload']"
                                        label="Question type" required></v-select>
                                </v-col>
                                <v-col cols="12" v-if="questionType=='Multiple choice'">
                                    <v-switch v-model="multipleSelection" class="ma-2"
                                        label="Allow user to select multiple options"></v-switch>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="questionRef" :rules="notBlank" label="Question reference"
                                        hint="E.g. for 'How old are you?', reference might be 'User age'."
                                        persistent-hint="true" required></v-text-field>
                                </v-col>
                            </v-form>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text v-on:click="closeModal">Close</v-btn>
                    <v-btn color="blue darken-1" disabled="!valid" text @click="addQuestion">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
    export default {
        data() {
            return {
                questionText: '',
                questionType: '',
                questionRef: '',
                multipleSelection: false,
                notBlank: [v => !!v || 'Required'],
                valid: false
            }
        },
        methods: {
            addQuestion() {
                const postData = {
                    questionText: this.questionText,
                    questionType: this.questionType,
                    questionRef: this.questionRef,
                    multipleSelection: this.multipleSelection,
                    adjacentQuestion: this.$attrs.adjacentQuestion,
                    relativePosition: this.$attrs.relativePosition,
                    surveyID: this.$attrs.surveyID
                }
                this.closeModal();
                //TODO - L - POST data - Adds new question to Form plus back end
            },
            closeModal() {
                this.$attrs.show = false;
                this.$emit('close');
            }
        }
    }
</script>
