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
                                    <v-text-field v-model="$attrs.user.firstName" :rules="notBlank" label="First name" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="$attrs.user.surname" :rules="notBlank" label="Surname" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="$attrs.user.email" :rules="notBlank" label="Email" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field type="password" v-model="$attrs.user.password" :rules="notBlank" label="Password" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-select v-model="$attrs.user.orgs" :items="$attrs.orgOptions" item-text="name" return-object chips label="Organisations" multiple></v-select>
                                </v-col>
                                <v-col v-for="org in $attrs.user.orgs" :key="org.id" cols="12">
                                    <v-select v-model="org.role" :rules="notBlank" :items="['admin', 'editor']" :label="org.name + ' role'" required></v-select>
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
            notBlank: [v => !!v || 'Required'],
            valid: false
        }
    },
    methods: {
        createUser() {
            this.$emit('submit');
            this.closeModal();
        },

        closeModal() {
            this.$attrs.show = false;
            this.$emit('close');
        }
    }
}
</script>
