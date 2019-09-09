import axios from 'axios';

class Pages {
    static async loadOrganisations() {
        return '';
    }


    static async loadReports() {
        const reports = await axios.get('http://localhost:3000/api/users/organisation/1/reports');
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