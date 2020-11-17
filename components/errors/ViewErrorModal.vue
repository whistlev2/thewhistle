<template>
    <v-row justify="center">
        <v-dialog persistent v-model="$attrs.show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">WHISTLE ERROR {{ $attrs.error.id }}</span>
                </v-card-title>
                <v-card-text>
                    <p>Time: {{ $attrs.error.time }}</p>
                    <p>URL: {{ $attrs.error.url }}</p>
                    <p>Request body: {{ $attrs.error.body }}</p>
                    <p>Stack: {{ $attrs.error.stack }}</p>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn text v-on:click="closeModal" class="blueBtn">Close</v-btn>
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
    methods: {
        closeModal() {
            this.$attrs.show = false;
            this.$emit('close');
        }
    }
}
</script>
