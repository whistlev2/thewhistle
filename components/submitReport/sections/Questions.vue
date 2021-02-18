<template>
    <div style="margin: 0 auto; width: 600px;">
        <!-- TODO - ensure height works -->
        <div style="width: 100%; height: 500px;" id="my-embedded-typeform"></div>
        <v-btn v-if="sectionComplete" outlined @click="next" class="blueBtn">Next</v-btn>
    </div>
</template>

<style scoped>
.blueBtn {
    background-color: #50addb;
    color: white;
}
</style>

<script>
import * as typeformEmbed from '@typeform/embed'

export default {

    data() {
        return {
            sectionComplete: false
        };
    },

    mounted() {
        const url = `${this.$attrs.section.json._links.display}?session=${this.$attrs.sessionID}`;
        var el = document.getElementById("my-embedded-typeform");
        //TODO: Make this run on start report event
        // When instantiating a widget embed, you must provide the DOM element
        // that will contain your typeform, the URL of your typeform, and your
        // desired embed settings
        // TODO: add callback for submit button
        typeformEmbed.makeWidget(el, url, {
            hideFooter: true,
            hideHeaders: true,
            opacity: 0
        });

        typeformEmbed.makePopup(url, { onSubmit: this.onSectionComplete });
    },

    methods: {
        onSectionComplete(event) {
            let responseID = event.response_id;
            this.sectionComplete = true;

            let url = `/api/report/next-section/${this.$attrs.sessionID}`;
            
            let body = {
                test: this.$attrs.test
            }
            axios.get(url, body)
                .then((response) => {
                    let section = response.data;
                    this.$emit('complete', section);
                })
                .catch((response) => {
                    //TODO: Check response
                })
            
        },
    }
}
</script>
