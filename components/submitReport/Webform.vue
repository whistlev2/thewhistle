<template>
    <div>
        <div v-if="!startedReport">
            <v-radio-group v-model="usedBefore" required>
                Have you used this report form before?
                <v-radio label="Yes" :value="true"></v-radio>
                <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
            <template v-if="usedBefore">
                <v-radio-group v-model="hasReporter">
                    Do you know your anonymous reporter number?
                    <v-radio label="Yes" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </template>
            <template v-if="usedBefore && hasReporter">
                <v-text-field v-model="reporter" label="Reporter number" v-on:change="noReporterMatchInDB=false" :rules="[() => validReporterNumber || 'Invalid reporter number.']" outlined></v-text-field>
                <p v-if="noReporterMatchInDB" class="err">Incorrect reporter number. Please try again.</p>
            </template>
            <v-btn v-if="validReporterInfo" outlined v-on:click="startReport" class="blueBtn">Next</v-btn>
        </div>
        <div v-else>
            <!-- TODO: Put in report ID as hidden field -->
            Your anonymous reporter number is {{ reporter }}. Please take note of this for future reference if you can.
            <Typeform :typeformID="$attrs.typeformID" :reportID="reportID"></Typeform>
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

import Typeform from './Typeform.vue'

import axios from 'axios';

export default {
    components: {
        Typeform
    },

    data() {
        return {
            startedReport: false,
            usedBefore: true,
            hasReporter: true,
            reporter: '',
            reportID: '',
            noReporterMatchInDB: false
        }
    },

    computed: {
        validReporterInfo: function () {
            return !this.usedBefore || !this.hasReporter || this.validReporterNumber;
        },

        validReporterNumber: function () {
            let regex = new RegExp("^\\d{6}$");
            return regex.test(this.reporter);
        }
    },

    methods: {
        startReport() {
            //TODO: Get form
            let url = `/api/report/start/${this.$attrs.form}`;

            let data = {
                test: this.$attrs.test,
                usedBefore: this.usedBefore
            };
            if (this.usedBefore && this.hasReporter) {
                data.reporter = this.reporter;
            }
            axios.post(url, data)
                .then((response) => {
                    this.reporter = response.data.reporter;
                    this.reportID = response.data.id;
                    this.startedReport = true;
                })
                .catch((response) => {
                    //TODO: Check response
                    this.noReporterMatchInDB = true;
                })
        }
    }

}
</script>
