<template>
    <div>
        <v-data-table :headers="headers" :items="filteredItems"
            :items-per-page="5" class="elevation-1" @click:row="openViewErrorModal">
        </v-data-table>
        <ViewErrorModal :show="showViewErrorModal" @close="closeViewErrorModal" :error="selectedError" />
    </div>
</template>
<style scoped>
.blueBtn {
    background-color: #50addb;
    color: white;
}
</style>
<script>
import ViewErrorModal from './ViewErrorModal.vue';

export default {
    components: {
        ViewErrorModal
    },
    data() {
        return {
            headers: [
                { text: 'ID', value : 'id'},
                { text: 'Time', value : 'time'},
                { text: 'URL', value : 'url'},
                { text: 'Request body', value : 'body'},
                { text: 'Stack', value : 'stack'},
            ],
            selectedError: {},
            showViewErrorModal: false
        }
    },
    computed: {
        filteredItems: function () {
            const filters = Object.entries(this.$attrs.query);
            let ret = [];
            var showItem = true;
            //TODO - Parse query strings properly
            if (this.$attrs.items) {
                for (let i = 0; i < this.$attrs.items.length; i++) {
                    showItem = true;
                    for (let [key, value] of filters) {
                        if (this.$attrs.items[i][key] != value) {
                            showItem = false;
                        }
                    }
                    if (showItem) {
                        ret.push(this.$attrs.items[i]);
                    }
                }
            }
            return ret;
        }
    },
    methods: {
        openViewErrorModal(error) {
            this.selectedError = error;
            this.showViewErrorModal = true;
        },
        
        closeViewErrorModal() {
            this.showViewErrorModal = false;
        }
    }
}
</script>
