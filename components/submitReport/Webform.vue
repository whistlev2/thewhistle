<template>
    <div>
        <div v-if="!startedReport">
            {{ $attrs.form.description }}
            <v-btn outlined v-on:click="startReport" class="blueBtn">Start Report</v-btn>
        </div>
        <div v-else>
            <!-- TODO: Put in report ID as hidden field -->
            <Questions v-if="currentSection.type == 'questions'" :section="currentSection" :sessionID="sessionID" @complete="showNextSection"></Questions>//TODO: Change to session ID?
            <EmailVerification v-if="currentSection.type == 'emailverification'" :section="currentSection" :sessionID="sessionID" @complete="showNextSection"></EmailVerification>
            <ReporterNumber v-if="currentSection.type == 'reporternumber'" :section="currentSection" :sessionID="sessionID" @complete="showNextSection"></ReporterNumber>
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
//TODO: Do imports
import axios from 'axios';

export default {
    components: {
        //Typeform TODO: Sort components
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
            let url = `/api/report/start/${this.$attrs.form}`;
            
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
                })
        },

        showNextSection(section) {
            this.currentSection = section;
        }
    }

}
</script>
