<template>
    <div>
        <v-card v-for="form in forms" :key="form.slug" style="margin-bottom: 30px;">
            <v-card-title class="align-end fill-height">{{ form.organisation }} - {{ form.title }}</v-card-title>
            <v-card-actions>
                <FormActions :form="form" />
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>

import FormActions from '../components/forms/FormActions.vue';
import axios from 'axios'
import { mapGetters } from 'vuex';

export default {
    components: {
        FormActions
    },
    data() {
        return {
            forms: []
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            const url = '/api/forms/user/' + this.user.id;
            axios.get(url).then((d) => {
                this.forms = d.data.forms
            })
        }
    },

    computed: mapGetters({
        user: 'user/get'
    })
}
</script>
