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
import axios from 'axios';

export default {
    methods: {
        downloadPDF() {
            let url = `/api/session/download-pdf`;
            window.open(url);
        },
    }
}
</script>
