<template>
    <div>
        <v-data-table :headers="headers" :items="users" class="elevation-1"></v-data-table>
        <v-btn v-on:click="showCreateModal = true" style="position: absolute; right: 18px; margin-top: 10px; background-color:#033549; color:white;" text>Add User</v-btn>
        <CreateUserModal :show="showCreateModal" @close="closeCreateModal" />
    </div>
</template>


<script>
import CreateUserModal from '../components/users/CreateUserModal.vue';
import axios from 'axios'

var _ = require('underscore');

export default {
    components: {
        CreateUserModal
    },
    data() {
        return {
            headers: [{
                text: 'Name',
                value: 'name'
            },
            {
                text: 'Email',
                value: 'email'
            },
            {
                text: 'Organisations',
                value: 'orgString'
            }
            ],
            users: [],
            showCreateModal: false
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

        canEditUser(currentUserOrgs, orgs) {
            return currentUserOrgs.some(org => orgs.includes(org)); 
        },

        fetchData() {
            let currentUser = this.getUser();
            const url = `/api/users/${currentUser.id}`;
            axios.get(url).then((data) => {
                this.users = data.data.users.map((user) => {
                    user.orgString = user.orgs.map((org) => org.name).join(', ');
                    user.name = `${user.firstName} ${user.surname}`;
                    return user;
                });

            })
        },

        closeCreateModal() {
            this.showCreateModal = false;
        }
    }

}
</script>
