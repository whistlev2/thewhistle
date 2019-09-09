import axios from 'axios';

class Pages {
    static async loadOrganisations() {
        return '';
    }


    static async loadReports() {
        const url = process.env.baseURL + '/api/users/organisation/1/reports';
        const reports = await axios.get(url);
        return reports;
    }


    static async loadForms() {
        return '';
    }


    static async loadUsers() {
        return '';
    }
}

export default Pages;