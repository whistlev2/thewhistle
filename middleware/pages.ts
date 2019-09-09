import axios from 'axios';

class Pages {
    static async loadEditForm(formID) {
        const url = process.env.baseURL + '/api/forms/' + formID;
        const form = await axios.get(url);
        return form.data;
    }


    static async loadOrganisations() {
        const headers = [{
                text: 'Organisation',
                value: 'ref1'
            },
            {
                text: 'My role',
                value: 'ref2'
            }
        ];
        const items = [
            {
                ref1: 'HFRN',
                ref2: 'admin'
            },
            {
                ref1: 'SCOC',
                ref2: 'user'
            }
        ];

        return {
            headers: headers,
            items: items
        };
    }


    static async loadReports() {
        const url = process.env.baseURL + '/api/users/organisation/1/reports';
        const reports = await axios.get(url);
        return reports.data;
    }


    static async loadForms() {
        return '';
    }


    static async loadUsers() {
        return '';
    }


    static async loadReport(reportId) {
        return '';
    }


    static async loadFormViewAccess(userId, formId) {
        return '';
    }


    static async loadEditUser(userId) {
        return '';
    }


    static async loadCreateUser() {
        return '';
    }
}

export default Pages;