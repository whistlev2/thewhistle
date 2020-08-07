<template>
    <v-row justify="center">
        <v-dialog v-model="$attrs.show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Edit Report View Access</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-form ref="form">
                                <v-col cols="12">
                                    <v-switch v-for="user in $attrs.users" :key="user.ref" v-model="user.access" :label="`${user.name} ${user.access ? 'can view' : 'cannot view'}.`"></v-switch>
                                </v-col>
                            </v-form>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text v-on:click="closeModal">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="updateAccess">Update Access</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    methods: {
        updateAccess() {
            const postData = this.getPostData();
            this.closeModal();
            //TODO - Updates who has access to the report takes a list of user id's and updates access
        },

        closeModal() {
            this.$attrs.show = false;
            this.$emit('close');
        },

        getPostData() {
            let ret = [];
            for (let i = 0; i < this.$attrs.users.length; i++) {
                ret.push({
                    ref: this.$attrs.users[i].ref,
                    access: this.$attrs.users[i].access
                })
            }
            return ret;
        }
    }
}
</script>
