<!-- TODO - allow user to switch organisation -->
<!-- Radio button selector -->
<template>
    <div>
        <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1"></v-data-table>
        <v-btn v-on:click="showCreateModal = true" style="position: absolute; right: 18px; margin-top: 10px; background-color:#033549; color:white;" text>Create Organisation</v-btn>
        <CreateOrganisationModal :show="showCreateModal" @close="closeCreateModal" />
    </div>
</template>

<script>

import CreateOrganisationModal from '../components/organisations/CreateOrganisationModal.vue';

export default {
    components: {
        CreateOrganisationModal
    },

    data() {
        return {
            showCreateModal: false
        }
    },

    asyncData(context) {
        return context.organisations;
    },

    methods: {
        closeCreateModal() {
            this.showCreateModal = false;
        }
    }

}
</script>
