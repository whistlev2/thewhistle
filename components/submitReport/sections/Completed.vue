<template>
    <div>
        <p>{{ $attrs.section.json.text }}</p>
        <v-btn v-if="$attrs.section.json.allowDownload" outlined @click="downloadPDF" class="blueBtn">Download Report PDF</v-btn>
    </div>
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
    },

    methods: {
        downloadPDF() {
            let url = `/api/report/download-pdf/${this.$attrs.sessionID}`;
            //TODO: Implement
            axios.get(url)
                .then((response) => {
                    
                })
                .catch((response) => {
                    //TODO: Check response
                })
        },
    }
}
</script>
