<template>
    <div>
        <v-card v-for="form in forms" :key="form.slug" style="margin-bottom: 30px;">
            <v-card-title class="align-end fill-height">{{ form.title }}</v-card-title>
            <v-card-actions>
                <FormActions :form="form" />
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>

import FormActions from '../components/forms/FormActions.vue';

export default {
    components: {
        FormActions
    },

    asyncData(context) {
        return {
            forms: context.forms
        };
    },

}
</script>
