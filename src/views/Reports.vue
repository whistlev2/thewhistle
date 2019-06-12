<template>
    <v-data-table :headers="getTableHeaders()" :items="reports">
        <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.date }}</td>
        </template>
    </v-data-table>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
@Component({})
class App extends Vue {
    reports: object[] = [];
    tableHeaders: object[] = [
        {
            text: 'ID',
            value: 'id'
        },
        {
            text: 'Name',
            value: 'name'
        },
        {
            text: 'Date',
            value: 'date'
        }
    ];
    getReports(): object[] {
        return this.reports;
    }
    setReports(reports: object[]): void {
        this.reports = reports;
    }
    getTableHeaders(): object[] {
        return this.tableHeaders;
    }
    mounted() {
        const url =
            'http://api.' + process.env.VUE_APP_SERVER_DOMAIN + '/reports';
        axios
            .get(url)
            .then(response => {
                this.setReports(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }
}
export default App;
</script>
