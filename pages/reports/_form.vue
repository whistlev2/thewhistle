<template>
    <div>
        <ReportTable :headers="headers" :items="items" :query="$route.query" />
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
        return context.reports;
    },

    computed: {
        
    },
    mounted () {
        this.headers.push({ text: 'Actions', value: 'action', sortable: false });
    }

}
</script>
