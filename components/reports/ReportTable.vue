<template>
    <div>
        <v-data-table :headers="$attrs.headers" :items="filteredItems"
            :items-per-page="5" class="elevation-1">
            <template v-slot:item.action="{ item }">
                <v-btn :to="item.url" style="background-color:#033549; color:white;" text>View</v-btn>
            </template>
        </v-data-table>
    </div>
</template>
<style scoped>
.blueBtn {
    background-color: #50addb;
    color: white;
}
</style>
<script>

export default {
    computed: {
        filteredItems: function () {
            const filters = Object.entries(this.$attrs.query);
            let ret = [];
            var showItem = true;
            //TODO - Parse query strings properly
            for (let i = 0; i < this.$attrs.items.length; i++) {
                showItem = true;
                for (let [key, value] of filters) {
                    if (this.items[i][key] != value) {
                        showItem = false;
                    }
                }
                if (showItem) {
                    ret.push(this.$attrs.items[i]);
                }
            }
            return ret;
        }
    }
}
</script>
