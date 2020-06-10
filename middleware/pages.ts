import axios from 'axios';

class Pages {

    static async loadEditForm(formSlug) {
        try {
            const url = process.env.baseURL + '/api/forms/edit/' + formSlug;
            const form = await axios.get(url);
            return form.data.form;
        } catch (err) {
            console.error(err);
            //TODO: Handle error properly
        }
    }

    static async loadReports(form) {
        const url = process.env.baseURL + `/api/reports/${form}`;
        const reports = await axios.get(url);
        return reports.data;
    }


    static async loadForms(user) {
        const userId = 1 // user.id
        const url = process.env.baseURL + '/api/forms/user/' + userId;
        const form = await axios.get(url);
        return form.data;
    }


    static async loadUsers(orgId) {
      const url = process.env.baseURL + '/api/users/organisation/'+ orgId +'/users';
      const form = await axios.get(url);
      return form.data;
    }

    static async loadFormFromSlug(slug) {
        const url = process.env.baseURL + `/api/forms/${slug}`;
        const form = await axios.get(url);
        return form.data;
    }


    // static async loadReport(reportId) {
    //     const url = process.env.baseURL + `/api/report/${reportId}`;
    //     const report = await axios.get(url);
    //     return report.data;
    // }


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
