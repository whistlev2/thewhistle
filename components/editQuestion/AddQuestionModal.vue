<template>
    <v-row justify="center">
        <v-dialog persistent v-model="$attrs.show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Add question</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-form ref="form" v-model="valid">
                                <v-col cols="12">
                                    <v-text-field v-model="$attrs.newQuestion.title" :rules="notBlank" label="Question text" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select v-model="$attrs.newQuestion.type" :rules="notBlank"
                                        :items="['Short text', 'Long text', 'Multiple choice', 'Dropdown', 'Date', 'File upload']"
                                        label="Question type" required></v-select>
                                </v-col>
                                <v-col cols="12" v-if="$attrs.newQuestion.type=='Multiple choice'">
                                    <v-switch v-model="$attrs.newQuestion.multipleSelection" class="ma-2"
                                        label="Allow user to select multiple options"></v-switch>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="$attrs.newQuestion.ref" :rules="notBlank" label="Question reference"
                                        hint="E.g. for 'How old are you?', reference might be 'User age'."
                                        :persistent-hint="true" required></v-text-field>
                                </v-col>
                            </v-form>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn :disabled="!valid" text @click="submit" class="blueBtn">Add</v-btn>
                    <v-btn text v-on:click="closeModal" class="blueBtn">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<style scoped>
.blueBtn {
    background-color: #50addb;
    color: white;
}
</style>
<script>
export default {
    data() {
        return {
            notBlank: [v => !!v || 'Required'],
            valid: false
        }
    },
    methods: {
        closeModal() {
            this.$attrs.show = false;
            this.$emit('close');
        },
        submit() {
            this.closeModal();
            this.$emit('submit');
        }
    }
}
</script>
