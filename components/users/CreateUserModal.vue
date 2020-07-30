<template>
    <v-row justify="center">
        <v-dialog v-model="$attrs.show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Add User</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-form ref="form" v-model="valid">
                                <v-col cols="12">
                                    <v-text-field v-model="email" :rules="notBlank" label="Email" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="password" :rules="notBlank" label="Password" required></v-text-field>
                                </v-col>
                            </v-form>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text v-on:click="closeModal">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="createUser">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            orgId: 1,
            notBlank: [v => !!v || 'Required'],
            valid: false
        }
    },
    methods: {
        createUser() {
            const postData = {
                email: this.email,
                password: this.password,
                organisation: this.orgId
            }
            this.$store.dispatch('register', postData)
            this.closeModal();
            // TODO - NTH - create new organisation - passes in name and slug
        },

        closeModal() {
            this.$attrs.show = false;
            this.$emit('close');
        }
    }
}
</script>
