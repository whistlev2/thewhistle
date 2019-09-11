<template>
    <div>
        <v-btn :to="editURL" style="background-color:#033549; color:white;" text>Edit</v-btn>
        <v-btn style="background-color:#033549; color:white;" text>Publish</v-btn>
        <v-btn style="background-color:#033549; color:white;" text>Delete</v-btn>
    </div>
</template>

<script>

export default {
    components: {
    },
    computed: {
        editURL: function () {
            return `/edit-form/${this.$attrs.form.id}`;
        }
    },
}
</script>
