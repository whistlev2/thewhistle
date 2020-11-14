<template>
    <div>
        <v-data-table :headers="headers" :items="orgs" :items-per-page="10" class="elevation-1"></v-data-table>
        <v-btn v-on:click="showCreateModal = true" style="position: absolute; right: 18px; margin-top: 10px; background-color:#033549; color:white;" text>Create Organisation</v-btn>
        <CreateOrganisationModal :show="showCreateModal" @close="closeCreateModal" @submit="createOrg" :org="newOrg" />
    </div>
</template>

<script>

import CreateOrganisationModal from '../components/organisations/CreateOrganisationModal.vue';
import axios from 'axios'


export default {
    components: {
        CreateOrganisationModal
    },

    data() {
        return {
            headers: [{
                text: 'Organisation',
                value: 'name'
            },
            {
                text: 'My role',
                value: 'role'
            }],
            orgs: [],
            showCreateModal: false,
            newOrg: {
                name: '',
                slug: ''
            }
        }
    },

    created() {
        this.fetchData()
    },

    methods: {
        getUser() {
            let user = {};
            try {
                user = this.$cookies.get('user');
            } catch (err) {
                console.log(err)
                return null;
                //TODO: Redirect to login
            }
            return user;
        },

        fetchData() {
            let currentUser = this.getUser();
            const url = `/api/organisations/${currentUser.id}`;
            axios.get(url).then((response) => {
                this.orgs = response.data.orgs;
            })
        },

        updateUserCookie() {
            let user = this.getUser();
            user.orgs = this.orgs;
            this.$cookies.set('user', user, { maxAge: 7 * 24 * 60 * 60 });
        },

        createOrg() {
            let url = `/api/organisations/create`;
            let data = {
                org: this.newOrg,
                user: this.getUser().id
            };
            axios.post(url, data).then((response) => {
                this.orgs = response.data.orgs;
                this.updateUserCookie()
                //TODO: Handle errors
            });
        },

        closeCreateModal() {
            this.showCreateModal = false;
        }
    },

    computed: {
        user: function () {
            let user = {};
            try {
                user = user = this.$cookies.get('user');
            } catch (err) {
                return null;
                //TODO: Redirect to login
            }
            return user;
        }
    }

}
</script>
