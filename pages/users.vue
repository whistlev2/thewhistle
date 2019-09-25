<template>
    <div>
      <!-- TODO - L - user views -->
        USERS
        <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1"></v-data-table>
        <v-btn v-on:click="showCreateModal = true" style="position: absolute; right: 18px; margin-top: 10px; background-color:#033549; color:white;" text>Add User</v-btn>
        <CreateUserModal :show="showCreateModal" @close="closeCreateModal" />
    </div>
</template>


<script>
import CreateUserModal from '../components/users/CreateUserModal.vue';
export default {
  components: {
      CreateUserModal
  },
// TODO - L - return data from backend
    data() {
        return {
            headers: [{
                    text: 'Name',
                    value: 'ref1'
                },
                {
                    text: 'Email',
                    value: 'ref2'
                }
            ],
            items: [{
                    ref1: 'Tom',
                    ref2: 'tjcberman@gmail.com'
                },
                {
                    ref1: 'Louis',
                    ref2: 'lmcs97@gmail.com'
                }
            ],
            showCreateModal: false
        }
    },
    asyncData(context) {},
    methods: {
        closeCreateModal() {
            this.showCreateModal = false;
        }
    }

}
</script>
