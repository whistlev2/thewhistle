<template>
    <div class="v-text-field__slot">
        <strong>{{ $attrs.choice ? 'Yes' : 'No' }}</strong>
        <ChoiceActions :question="$attrs.question" :surveyID="$attrs.surveyID" :choice="$attrs.choice"
            :jumpOptions="$attrs.jumpOptions" />
    </div>
</template>
<script>
    import ChoiceActions from './ChoiceActions.vue';
    export default {
        components: {
            ChoiceActions
        }
    }
</script>