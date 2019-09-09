<template>
    <div>
        <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1"></v-data-table>
        <v-btn style="position: absolute; right: 18px; margin-top: 10px; background-color:#033549; color:white;" text>Create Organisation</v-btn>
    </div>
</template>

<script>

export default {

    data() {
        return {

        }
    },

    asyncData(context) {
        return context.organisations;
    }

}
</script>
