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
        console.log(this.$store.state)
        const headers = [{
                text: 'Organisation',
                value: 'ref1'
            },
            {
                text: 'My role',
                value: 'ref2'
            }
        ];
        const items = [{
              ref1: `${this.$store.state.authUser.name}`,
              ref2: 'admin'
        }]


        return {
            headers: headers,
            items: items,
            showCreateModal: false
        }
    },

    methods: {
        closeCreateModal() {
            this.showCreateModal = false;
        }
    }

}
</script>
