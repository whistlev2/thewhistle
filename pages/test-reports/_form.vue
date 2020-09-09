<template>
    <div>
        <ReportTable :headers="headers" :items="items" :query="$route.query" />
    </div>
</template>

<script>
import ReportTable from '../../components/reports/ReportTable.vue'
export default {
    components: {
        ReportTable
    },

    data() {
        return {
            search: ''
        }
    },

    asyncData(context) {
        return {
            headers: context.reports.headers,
            items: context.reports.items
        }
    },

    computed: {
        
    },
    mounted () {
        if (this.headers) {
            this.headers.push({ text: 'Actions', value: 'action', sortable: false });
        }
    }

}
</script>
