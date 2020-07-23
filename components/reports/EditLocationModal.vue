<template>
    <v-row justify="center">
        <v-dialog v-model="$attrs.show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Edit Location</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Location" placeholder="Add location" v-model="editingLocation"  />
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text v-on:click="closeModal">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="updateLocation">Update Location</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            editingLocation: this.location
        }
    },
    methods: {
        updateLocation() {
            this.closeModal();
            this.$emit('update-location', this.editingLocation);
        },

        openModal() {
            this.editingLocation = this.location;
        },

        closeModal() {
            this.$attrs.show = false;
            this.$emit('close');
        }
    },
    props: [ 'location' ]
}
</script>
