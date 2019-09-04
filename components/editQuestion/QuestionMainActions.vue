<template>
    <div>
        <v-btn v-on:click="showBefore = true">Add before</v-btn>
        <v-btn v-on:click="showAfter = true">Add after</v-btn>
        <v-btn action="remove">Remove question</v-btn>
        <AddQuestionModal :show="showBefore" @close="closeBeforeModal" :adjacentQuestion="$attrs.question.ref" relativePosition="before" :surveyID="$attrs.surveyID" />
        <AddQuestionModal :show="showAfter" @close="closeAfterModal" :adjacentQuestion="$attrs.question.ref" relativePosition="after" :surveyID="$attrs.surveyID" />
    </div>
</template>
<script>

import AddQuestionModal from './AddQuestionModal.vue';

export default {
    components: {
        AddQuestionModal
    },
    data() {
        return {
            showBefore: false,
            showAfter: false
        }
    },
    methods: {
        closeBeforeModal() {
            this.showBefore = false;
        },
        closeAfterModal() {
            this.showAfter = false;
        }
    }
}
</script>
