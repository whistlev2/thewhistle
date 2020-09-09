<template>
    <v-row justify="center">
        <v-dialog persistent v-model="$attrs.show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Create Form</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-form ref="form" v-model="valid">
                                <v-col cols="12">
                                    <v-text-field v-model="$attrs.newForm.title" :rules="notBlank" label="Title" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="$attrs.newForm.description" :rules="notBlank" label="Description" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <!-- TODO: Validation on slug -->
                                    <v-text-field v-model="$attrs.newForm.slug" :rules="notBlank" label="Slug" 
                                    hint="Unique reference for the URL" :persistent-hint="true" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <!-- TODO: Give options from user's orgs -->
                                    <v-select v-model="$attrs.newForm.org" :rules="notBlank"
                                        :items="orgs" label="Organisation" item-text="name" item-value="id" required></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-radio-group v-model="$attrs.newForm.web" row>
                                        <v-radio label="Web Form" :value="true"></v-radio>
                                        <v-radio label="SMS Form" :value="false"></v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-form>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn :disabled="!valid" text @click="submit" class="blueBtn">Create</v-btn>
                    <v-btn text v-on:click="closeModal" class="blueBtn">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<style scoped>
.blueBtn {
    background-color: #50addb;
    color: white;
}
</style>
<script>
export default {
    data() {
        return {
            notBlank: [v => !!v || 'Required'],
            valid: false
        }
    },
    methods: {
        closeModal() {
            this.$attrs.show = false;
            this.$emit('close');
        },

        submit() {
            this.closeModal();
            this.$emit('submit');
        },

        
    },
    computed: {
        orgs: function () {
            let user = {};
            try {
                user = JSON.parse(Cookies.get('user'));
            } catch (err) {
                return [];
                //TODO: Redirect to login
            }
            let ret = [];
            const orgs = user.orgs;
            for (let i = 0; i < orgs.length; i++) {
                if (orgs[i].active && (orgs[i].role == 'admin' || orgs[i].role == 'editor')) {
                    ret.push(orgs[i]);
                }
            }
            return ret;
        }
    }
}
</script>
