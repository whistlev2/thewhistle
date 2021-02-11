<template>
    <div>
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
        <v-btn v-if="validReporterInfo" outlined v-on:click="submitSection" class="blueBtn">Next</v-btn>
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

export default {

    data() {
        return {
            usedBefore: true,
            hasReporter: true,
            reporter: '',
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
        submitSection() {
            //TODO: Get form
            let url = `/api/report/submit-section/${this.$attrs.sessionID}`;
            
            let data = {
                section: this.$attrs.section.id,
                usedBefore: this.usedBefore,
                type: 'reporter'
            };

            if (this.usedBefore && this.hasReporter) {
                data.reporter = this.reporter;
            }

            axios.post(url, data)
                .then((response) => {
                    this.currentSection = response.data.nextSection //TODO: Implement this
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status == '404') {
                            this.noReporterMatchInDB = true;
                        }
                        //TODO: Handle other errors
                    }
                })
        },
    }

}
</script>
