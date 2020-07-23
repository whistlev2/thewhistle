<template>
    <div>
        <v-btn :to="actualURL" class="blueBtn" text>View Form</v-btn>
        <v-btn v-if="this.$attrs.form.published" :to="actualURL" class="blueBtn" text>View Actual</v-btn>
        <v-btn :to="responsesURL" class="blueBtn" text>View Responses</v-btn>
        <template v-if="canEdit">
            <v-btn :to="editURL" class="blueBtn" text>Edit</v-btn>
            <v-btn v-on:click="showPublishModal = true" class="blueBtn" text>Publish</v-btn>
            <v-btn v-on:click="showDeleteModal = true" class="blueBtn" text>Delete</v-btn>
            <FormPublishModal :show="showPublishModal" @close="closePublishModal" :formSlug="this.$attrs.form.slug" :formTitle="this.$attrs.form.title" />
            <FormDeleteModal :show="showDeleteModal" @close="closeDeleteModal" :formSlug="this.$attrs.form.slug" :formTitle="this.$attrs.form.title" />
        </template>
        <AddQuestionModal :show="showAddQuestionModal" @close="closeAddQuestionModal" @submit="addQuestion" :newQuestion="newQuestion" />
    </div>
</template>
<style scoped>
.blueBtn {
    background-color: #50addb;
    color: white;
    margin-bottom: 10px;
}
</style>
<script>

import FormPublishModal from './FormPublishModal.vue';
import FormDeleteModal from './FormDeleteModal.vue';

export default {
    components: {
        FormPublishModal,
        FormDeleteModal
    },
    data() {
        return {
            showPublishModal: false,
            showDeleteModal: false
        }
    },
    computed: {
        testURL: function () {
            return `/survey/${this.$attrs.form.slug}/test`;
        },
        actualURL: function () {
            return `/survey/${this.$attrs.form.slug}`;
        },
        responsesURL: function () {
            //TODO - NTH - mkase sure slug is well behaved Parse query params
            return `/reports/${this.$attrs.form.slug}`;
        },
        editURL: function () {
            return `/edit-form/${this.$attrs.form.slug}`;
        },
        canEdit: function () {
            return this.$attrs.form.role == 'admin' || this.$attrs.form.role == 'editor';
        }
    },
    methods: {
        closePublishModal() {
            this.showPublishModal = false;
        },
        closeDeleteModal() {
            this.showDeleteModal = false;
        },
    }
}
</script>
