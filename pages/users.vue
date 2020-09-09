<template>
    <div>
        <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1"></v-data-table>
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
                    value: 'ref1'
                },
                {
                    text: 'Email',
                    value: 'ref2'
                },
                {
                    text: 'Role',
                    value: 'ref3'
                }
            ],
            items: [],
            showCreateModal: false
        }
    },
    created() {
      this.fetchData()
    },
    methods: {
        fetchData() {
          //TODO: Get org properly
          const orgId = 1
          const url = '/api/users/organisation/'+ orgId +'/users';
          axios.get(url).then(
            (d) =>
              this.items = _.map(d.data, (user) => {return {ref1: `${user.first_name} ${user.surname}`, ref2: `${user.email}`, ref3: `${user.role}`}})
          )
        },
        closeCreateModal() {
            this.showCreateModal = false;
        }
    }

}
</script>
