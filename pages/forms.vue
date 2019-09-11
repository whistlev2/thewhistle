<template>
    <div>
        <v-card v-for="form in forms" :key="form.id">
            <v-card-title class="align-end fill-height">{{ form.name }}</v-card-title>
            <v-card-actions>
                <FormEditActions v-if="form.editAccess" :form="form" />
                <FormViewActions :form="form" />
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>

import FormEditActions from '../components/forms/FormEditActions.vue';
import FormViewActions from '../components/forms/FormViewActions.vue';

export default {
    components: {
        FormEditActions,
        FormViewActions
    },

    asyncData(context) {
        return {
            forms: context.forms
        };
    },

}
</script>
