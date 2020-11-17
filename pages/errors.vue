<template>
    <div>
        <ErrorTable :items="items" :query="$route.query" />
    </div>
</template>

<script>
import ErrorTable from '../components/errors/ErrorTable.vue'
export default {
    components: {
        ErrorTable
    },

    asyncData(context) {
        return {
            items: context.errors.errors
        }
    }

}
</script>
