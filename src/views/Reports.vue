<template>
    <v-data-table :headers="getTableHeaders()" :items="tableRows">
        <template v-slot:items="props">
            <td v-for="header in getTableHeaders()" :key="header.value">
                {{ props.item[header.value] }}
            </td>
        </template>
    </v-data-table>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
@Component({})
class App extends Vue {
    reports: object[] = [];
    tableHeaders: object[] = [];
    tableRows: object[] = [];

    getReports(): object[] {
        return this.reports;
    }

    getAnswer(answer: object): string { //Sort type definitions
        let type = answer.type;
        let response = answer[type];
        let ret = response instanceof Object ? response.label : response;
        return ret;
    }
    
    getTableHeaders(): object[] {
        return this.tableHeaders;
    }

    setReports(reports: object[]): void {
        this.reports = reports;
    }

    setTableHeaders(): void {
        let headers = this.reports[0].definition.fields; //TODO: Define this object more precisely
        for (let i = 0; i < headers.length; i++) {
            this.tableHeaders.push({
                text: headers[i].title,
                value: headers[i].id
            })
        }
    }

    setTableRows(): void {
        let rows = [];
        for (let rowIndex = 0; rowIndex < this.reports.length; rowIndex++) {
            let row = {};
            let answers = this.reports[rowIndex].answers; //TODO: Define type
            for (let columnIndex = 0; columnIndex < answers.length; columnIndex++) {
                let key = answers[columnIndex].field.id;
                let value = this.getAnswer(answers[columnIndex]);
                row[key] = value; //TODO: fix any type
            }
            rows.push(row);
        }
        this.tableRows = rows;
    }

    mounted() {
        const url =
            'http://api.' + process.env.VUE_APP_SERVER_DOMAIN + '/reports';
        axios
            .get(url)
            .then(response => {
                this.setReports(response.data);
                this.setTableHeaders();
                this.setTableRows();
            })
            .catch(err => {
                console.error(err);
            });
    }
}
export default App;
</script>
