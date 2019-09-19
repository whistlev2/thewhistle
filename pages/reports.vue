<template>
    <div>
        <v-data-table :headers="headers" :items="filteredItems"
            :items-per-page="5" class="elevation-1">
            <template v-slot:item.action="{ item }">
                <v-btn :to="item.url" style="background-color:#033549; color:white;" text>View</v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>

export default {

    data() {
        return {
            search: ''
        }
    },

    asyncData(context) {
        console.log('plug', context.reports);
        return context.reports;
    },

    computed: {
        filteredItems: function () {
            const filters = Object.entries(this.$route.query);
            let ret = [];
            var showItem;
            //TODO: Parse query strings properly
            for (let i = 0; i < this.items.length; i++) {
                showItem = true;
                for (let [key, value] of filters) {
                    if (this.items[i][key] != value) {
                        showItem = false;
                    }
                }
                if (showItem) {
                    ret.push(this.items[i]);
                }
            }
            return ret;
        }
    }

}
</script>
