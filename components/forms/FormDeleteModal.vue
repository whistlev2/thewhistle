<template>
    <v-row justify="center">
        <v-dialog v-model="$attrs.show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Delete Form</span>
                </v-card-title>
                <v-card-text>
                    Are you sure you want to delete form '{{ $attrs.formTitle }}'?
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text v-on:click="closeModal">Close</v-btn>
                    <v-btn color="blue darken-1" :disabled="true" text @click="deleteForm">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    methods: {
        deleteForm() {
            this.closeModal();
            //TODO - L - post form ID to API end point to delete data (this does not delete the responses)
        },

        closeModal() {
            this.$attrs.show = false;
            this.$emit('close');
        }
    }
}
</script>
