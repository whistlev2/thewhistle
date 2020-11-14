<!-- TODO - NTH - Add outline of admin metadata form -->
<template>
    <div>
        <h1>Reporter {{ report.metadata.reporter }} - {{ report.metadata.date }} - {{ report.formSlug }}</h1>

        <v-list two-line subheader style="background-color: #dee9ed">
            <v-list-item >
                <v-list-item-content>
                    <v-list-item-title>Assigned to</v-list-item-title>
                    <v-list-item-subtitle>
                        <v-select :items="report.options.assignedTo" v-model="report.metadata.assignedTo" v-on:change="updateAssigned" item-text="name" item-value="id" />
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item >
                <v-list-item-content>
                    <v-list-item-title>Status</v-list-item-title>
                    <v-list-item-subtitle>
                        <v-combobox :items="report.options.status" v-model="report.metadata.status" v-on:change="updateStatus" />
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <br>

        <v-list two-line subheader style="background-color: #dee9ed">
            <v-subheader>Submitted Report</v-subheader>
            <v-list-item v-for="question in report.responses" :key="question.ref">
                <v-list-item-content>
                    <v-list-item-title>{{ question.ref }}</v-list-item-title>
                    <v-list-item-subtitle>{{ question.value }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <br>
        <v-list two-line subheader style="background-color: #dee9ed">
            <v-subheader>Files</v-subheader>

            <v-list-item v-for="file in report.files" :key="file.url">
                <v-list-item-content>
                    <v-list-item-title>{{ file.name }}
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <a :href="file.url" target="_blank" style="text-decoration: none">
                                    <v-icon v-on="on" small>mdi-arrow-collapse-down</v-icon>
                                </a>
                            </template>
                            <span>Download file</span>
                        </v-tooltip>
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ file.type }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <br>
        <v-list two-line subheader style="background-color: #dee9ed">
            <v-subheader>
                <span style="padding-right: 5px;">Location</span>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-icon v-on="on" v-on:click="openEditLocationModal">mdi-pencil</v-icon>
                    </template>
                    <span>Edit location</span>
                </v-tooltip>
            </v-subheader>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>{{ report.metadata.location }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <br>
        <v-list two-line subheader style="background-color: #dee9ed">
            <v-list-item >
                <v-list-item-content>
                    <v-list-item-title>Tags</v-list-item-title>
                    <v-list-item-subtitle>
                        <v-combobox :items="report.options.tags" v-model="report.metadata.tags" v-on:change="updateTags"  multiple chips/>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item >
                <v-list-item-content>
                    <v-list-item-title>Archive</v-list-item-title>
                    <v-list-item-subtitle>
                        <v-radio-group v-model="report.metadata.active" v-on:change="updateActive">
                            <v-radio :value="true" label="Active" />
                            <v-radio :value="false" label="Archived" />
                        </v-radio-group>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-group v-if="report.audit.length > 0" no-action sub-group>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>Audit trail</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item v-for="edit in report.audit" :key="edit.time + edit.action">
                    <v-list-item-content>
                        <v-list-item-title>
                            <strong>{{ edit.user }}</strong> - {{ edit.time}}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ edit.action }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
        <br>
        <v-list two-line subheader style="background-color: #dee9ed">
            <v-subheader>Notes</v-subheader>
            <v-list-item v-for="note in report.notes" :key="note.time + note.comment">
                <v-list-item-content>
                    <v-list-item-title>
                        <strong>{{ note.user }}</strong> - {{ note.time}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ note.comment }}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-text-field label="Note" placeholder="Add a comment" v-model="comment" />
                    <v-btn v-on:click="addComment" style="background-color:#50addb; color:white;" text>
                        Add comment
                    </v-btn>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <div style="position: absolute; right: 18px; margin-top: 10px;" >
            <v-btn style="background-color:#033549; color:white;" text>
                Export to PDF
            </v-btn>
            <v-btn v-on:click="showEditAccessModal = true" style="background-color:#033549; color:white;" text>
                Edit Report View Access
            </v-btn>
        </div>
        <EditReportAccessModal :users="report.users" :show="showEditAccessModal" @close="closeEditAccessModal" />
        <EditLocationModal ref="locationModal" :location="report.metadata.location" :show="showEditLocationModal" @close="closeEditLocationModal" @update-location="updateLocation" />
    </div>
</template>

<script>
import EditReportAccessModal from '../../components/report/EditReportAccessModal.vue';
import EditLocationModal from '../../components/report/EditLocationModal.vue';
import axios from 'axios'

var _ = require('underscore');

export default {
    components: {
        EditReportAccessModal,
        EditLocationModal
    },

    data() {
        return {
            comment: '',
            showEditAccessModal: false,
            showEditLocationModal: false,
            report: {
                id: '',
                reporterID: '',
                metadata: {},
                notes: [],
                audit: [],
                formSlug: '',
                responses: [],
                organisation: {},
                options: {}
            }
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.report.id = this.$route.params.report
            const reportUrl = `/api/report/${this.report.id}`;
            axios.get(reportUrl).then((d) => {
                this.report.responses = _.map(d.data.responses, (res) => {
                    return {
                        ref: res.question_ref,
                        question: res.definition.title,
                        value: res.value
                    }
                })
                this.report.reporterID = d.data.reporterID;
                this.report.metadata = d.data.metadata;
                this.report.formSlug = d.data.formSlug;
                this.report.files = d.data.files;
                this.report.organisation = d.data.organisation;
                this.report.options = d.data.options;
                this.report.audit = d.data.audit;
                this.report.notes = d.data.notes;
            });
        },

        getUser() {
            let user = {};
            try {
                user = this.$cookies.get('user');
            } catch (err) {
                return null;
                //TODO: Redirect to login
            }
            return user;
        },

        updateAssigned() {
            const url = `/api/report/assigned/${this.report.id}`;
            const data = {
                report: this.report.id,
                user: this.getUser().id,
                assigned: this.report.metadata.assignedTo
            };
            axios.post(url, data).then((response) => {
                this.report.audit = response.data.audit
                //TODO: Handle errors
            });
        },

        updateStatus() {
            const url = `/api/report/status/${this.report.id}`;
            const data = {
                report: this.report.id,
                user: this.getUser().id,
                status: this.report.metadata.status
            };
            axios.post(url, data).then((response) =>
                this.report.audit = response.data.audit
                //TODO: Update audit trail
                //TODO: Handle errors
            );
        },

        updateTags() {
            const url = `/api/report/tags/${this.report.id}`;
            const data = {
                report: this.report.id,
                user: this.getUser().id,
                tags: this.report.metadata.tags
            };
            axios.post(url, data).then((response) =>
                this.report.audit = response.data.audit
                //TODO: Update audit trail
                //TODO: Handle errors
            );
        },

        updateActive() {
            const url = `/api/report/active/${this.report.id}`;
            const data = {
                report: this.report.id,
                user: this.getUser().id,
                active: this.report.metadata.active
            };
            axios.post(url, data).then((response) =>
                this.report.audit = response.data.audit
                //TODO: Update audit trail
                //TODO: Handle errors
            );
        },

        updateLocation(location) {
            const url = `/api/report/location/${this.report.id}`;
            const data = {
                report: this.report.id,
                user: this.getUser().id,
                location: location
            };
            this.report.metadata.location = location;
            axios.post(url, data).then((response) =>
                this.report.audit = response.data.audit
                //TODO: Update audit trail
                //TODO: Handle errors
            );
        },

        addComment() {
            const url = `/api/report/note/${this.report.id}`;
            const data = {
                report: this.report.id,
                user: this.getUser().id,
                comment: this.comment
            };
            axios.post(url, data).then((response) => {
                this.report.audit = response.data.audit;
                this.report.notes = response.data.notes
                //TODO: Add comment to interface
                //TODO: Update audit trail
                //TODO: Handle errors
            });
        },

        openEditLocationModal() {
            this.showEditLocationModal = true;
            this.$refs.locationModal.openModal();
        },

        closeEditAccessModal() {
            this.showEditAccessModal = false;
        },

        closeEditLocationModal() {
            this.showEditLocationModal = false;
        }

    }

}
</script>
