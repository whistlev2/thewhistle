import axios from 'axios';

class Pages {
    static getAllQuestions(form) {
        let ret = [];
        for (let i = 0; i < form.length; i++) {
            ret[i] = {
                ref: form[i].ref,
                text: form[i].title
            };
        }
        return ret;
    }

    static async loadEditForm(formID) {
        const url = process.env.baseURL + '/api/forms/json/' + formID;
        const form = await axios.get(url);
        return form.data;
    }

    static async loadReports(form) {
        const url = process.env.baseURL + `/api/reports/${form}`;
        const reports = await axios.get(url);
        return reports.data;
    }


    static async loadForms(user) {
        console.log(user)
        const userId = 1 // user.id
        const url = process.env.baseURL + '/api/forms/user/' + userId;
        const form = await axios.get(url);
        return form.data;
    }


    // TODO - Get users from API
    static async loadUsers() {
        return '';
    }

    static async loadFormFromSlug(slug) {
        const url = process.env.baseURL + `/api/forms/${slug}`;
        const form = await axios.get(url);
        return form.data;
    }


    static async loadReport(reportId) {
        const url = process.env.baseURL + `/api/report/${reportId}`;
        const report = await axios.get(url);
        return report.data;
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
