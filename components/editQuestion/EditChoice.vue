<template>
    <v-list-item>
    <v-list-item-content>
        <v-list-item-title>
            <v-text-field :label="$attrs.choice.label" outlined v-model="$attrs.question.title" v-on:change="updateQuestion"></v-text-field>
        </v-list-item-title>
        <v-list-item-subtitle>
            <ChoiceActions :question="$attrs.question" :surveyID="$attrs.surveyID" :choice="$attrs.choice.ref"
                :jumpOptions="$attrs.jumpOptions" />
        </v-list-item-subtitle>
    </v-list-item-content>
</template>
<script>
import ChoiceActions from './ChoiceActions.vue';
export default {
    components: {
        ChoiceActions
    },
    methods: {
        updateChoiceLabel() {
            /* <form action="/update-choice" class="v-form">
            <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
            <input type="hidden" name="questionID" :value="$attrs.question.id" />
            <input type="hidden" name="choiceID" :value="$attrs.choice.id" />
            <input type="text" name="label" :value="$attrs.choice.label" style="border:1px solid red" />
            <input type="submit" value="Submit" />
            </form> */

        }
    }

}
</script>
