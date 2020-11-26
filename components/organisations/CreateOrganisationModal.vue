<template>
    <v-row justify="center">
        <v-dialog v-model="$attrs.show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Create Organisation</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-form ref="form" v-model="valid">
                                <v-col cols="12">
                                    <v-text-field v-model="$attrs.org.name" :rules="validName" label="Name" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="$attrs.org.slug" :rules="validSlug" label="Abbreviation"
                                        hint="Max 8 characters, no spaces." counter="8"
                                        :persistent-hint="true" required></v-text-field>
                                </v-col>
                            </v-form>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text v-on:click="closeModal">Close</v-btn>
                    <v-btn color="blue darken-1" :disabled="!valid" text @click="createOrganisation">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            valid: false,
            validName: [ v => !!v || 'Required', v => (new RegExp(/^[\w' ]+$/g)).test(v) || 'Can only contain letters, numbers, apostrophes and spaces', v => !this.orgNames.includes(v.toLowerCase()) || 'Organisation name already taken' ],
            validSlug: [ v => !!v || 'Required', v => (new RegExp(/^[\w-]+$/g)).test(v) || 'Can only contain letters, numbers and hyphens', v => v.length < 9 || 'Must be under 8 characters', v => !this.orgSlugs.includes(v.toLowerCase()) || 'Organisation abbreviation already taken' ]
        }
    },
    computed: {
        orgNames: function () {
            return this.$attrs.allOrgs.map(org => org.name.toLowerCase());
        },
        orgSlugs: function () {
            return this.$attrs.allOrgs.map(org => org.slug.toLowerCase());
        }
    },
    methods: {
        createOrganisation() {
            this.$emit('submit');
            this.closeModal();
            // TODO - NTH - create new organisation - passes in name and slug
        },

        closeModal() {
            this.$attrs.show = false;
            this.$emit('close');
        },
    }
}
</script>
