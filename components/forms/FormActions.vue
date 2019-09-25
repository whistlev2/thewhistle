<template>
    <div>
        <v-btn :to="testURL" style="background-color:#033549; color:white; margin-bottom: 10px;" text>View Test</v-btn>
        <v-btn v-if="this.$attrs.form.published" :to="actualURL" style="background-color:#033549; color:white; margin-bottom: 10px;" text>View Actual</v-btn>
        <v-btn :to="responsesURL" style="background-color:#033549; color:white; margin-bottom: 10px;" text>View Responses</v-btn>
        <template v-if="this.$attrs.form.userRole == 'admin'">
            <v-btn :to="editURL" style="background-color:#033549; color:white; margin-bottom: 10px;" text>Edit</v-btn>
            <v-btn v-on:click="showPublishModal = true" style="background-color:#033549; color:white; margin-bottom: 10px;" text>Publish</v-btn>
            <v-btn v-on:click="showDeleteModal = true" style="background-color:#033549; color:white; margin-bottom: 10px;" text>Delete</v-btn>
            <FormPublishModal :show="showPublishModal" @close="closePublishModal" :formSlug="this.$attrs.form.slug" :formTitle="this.$attrs.form.title" />
            <FormDeleteModal :show="showDeleteModal" @close="closeDeleteModal" :formSlug="this.$attrs.form.slug" :formTitle="this.$attrs.form.title" />
        </template>
    </div>
</template>

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
