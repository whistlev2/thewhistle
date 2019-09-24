<!-- TODO - NTH - Add outline of admin metadata form -->
<template>
    <div>
        <v-container class="grey lighten-5" v-for="question in report.questions" :key="question.ref">
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

export default {
    components: {
        EditReportAccessModal
    },

    data() {
        return {
            showEditAccessModal: false
        }
    },

    asyncData(context) {
        return {
            report: context.report
        }
    },

    methods: {
        closeEditAccessModal() {
            this.showEditAccessModal = false;
        }
    }

}
</script>
