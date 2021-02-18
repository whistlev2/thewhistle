<template>
    <div>
        <div v-if="!startedReport">
            {{ $attrs.form.description }}
            <br>
            <v-btn outlined v-on:click="startReport" class="blueBtn">Start Report</v-btn>
        </div>
        <div v-else>
            <Questions v-if="currentSection.type == 'Questions'" :section="currentSection" :sessionID="sessionID" :test="$attrs.test" @complete="showNextSection"></Questions>
            <EmailVerification v-if="currentSection.type == 'Email Verification'" :section="currentSection" :sessionID="sessionID" :test="$attrs.test" @complete="showNextSection"></EmailVerification>
            <ReporterNumber v-if="currentSection.type == 'Reporter Number'" :section="currentSection" :sessionID="sessionID" :test="$attrs.test" @complete="showNextSection"></ReporterNumber>
            <Completed v-if="currentSection.type == 'completed'" :section="currentSection" :sessionID="sessionID"></Completed>
        </div>
    </div>
</template>
<style scoped>
.blueBtn {
    background-color: #50addb;
    color: white;
}
.err {
    color: red;
}
</style>
<script>

//TODO: Sort broken refresh

//import Typeform from './Typeform.vue'
import Questions from './sections/Questions.vue'
//TODO: Do imports
import axios from 'axios';

export default {
    components: {
        Questions
    },

    data() {
        return {
            startedReport: false,
            sessionID: '',
            currentSection: {}
        }
    },

    methods: {
        startReport() {
            //TODO: Get form
            let url = `/api/report/start/${this.$attrs.form.id}`;

            let data = {
                test: this.$attrs.test                                                                   
            };

            axios.post(url, data)
                .then((response) => {
                    this.sessionID = response.data.sessionID; //TODO: Make this session ID instead of report ID
                    this.startedReport = true;
                    this.currentSection = response.data.nextSection //TODO: Implement this
                })
                .catch((response) => {
                    //TODO: Check response
                });
        },

        showNextSection(section) {
            this.currentSection = section;
        }
    }

}
</script>
