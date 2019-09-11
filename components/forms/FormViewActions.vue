<template>
    <div>
        <v-btn :to="testURL" style="background-color:#033549; color:white;" text>View Test</v-btn>
        <v-btn :to="actualURL" style="background-color:#033549; color:white;" text>View Actual</v-btn>
        <v-btn :to="responsesURL" style="background-color:#033549; color:white;" text>View Responses</v-btn>
    </div>
</template>

<script>

export default {
    components: {
    },
    computed: {
        testURL: function () {
            return `/report/${this.$attrs.form.organisation}/${this.$attrs.form.slug}/test`;
        },
        actualURL: function () {
            return `/report/${this.$attrs.form.organisation}/${this.$attrs.form.slug}`;
        },
        responsesURL: function () {
            return `/reports?form=${this.$attrs.form.id}`;
        },
    },
}
</script>
