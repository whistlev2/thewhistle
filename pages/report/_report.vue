<!-- TODO - NTH - Add outline of admin metadata form -->
<template>
    <div>
        <v-container class="grey lighten-5" v-for="question in report" :key="question.ref">
            <v-row>
                <v-col cols="6" md="4">
                    <v-card class="pa-2" outlined tile style="background-color: inherit; border: none; font-weight: bold;">
                        {{ question.key }}
                    </v-card>
                </v-col>
                <v-col cols="12" md="8">
                    <v-card class="pa-2" outlined tile>
                        {{ question.value }}
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-btn v-on:click="showEditAccessModal = true" style="position: absolute; right: 18px; margin-top: 10px; background-color:#033549; color:white;" text>Edit Report View Access</v-btn>
        <EditReportAccessModal :users="report.users" :show="showEditAccessModal" @close="closeEditAccessModal"/>
    </div>
</template>

<script>

import EditReportAccessModal from '../../components/reports/EditReportAccessModal.vue';
import axios from 'axios'
var _ = require('underscore');
export default {
    components: {
        EditReportAccessModal
    },

    data() {
        return {
            showEditAccessModal: false,
            report: []}
          },
      created() {
        this.fetchData()
      },
    methods: {
      fetchData() {
        const reportId = this.$route.params.report
        const url = `/api/report/${reportId}`;
        axios.get(url).then((d) => {          
          this.report = _.map(d.data, (res) => {return {ref: res.question_ref, key: res.definition.title, value: res.value.value} })
        })
      },
        closeEditAccessModal() {
            this.showEditAccessModal = false;
        }
    }

}
</script>
