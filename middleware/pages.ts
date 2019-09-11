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
        const url = process.env.baseURL + '/api/forms/myforms';
        const form = await axios.get(url);
        console.log(form.data);
        return form.data;
        /* return [
            {
                slug: 'rape-is-a-crime',
                name: 'Rape is a Crime',
                userRole: 'admin',
                published: true
            },
            {
                slug: 'everyday-racism',
                name: 'End Everyday Racism',
                userRole: 'user',
                published: false
            }
        ]; */
    }


    static async loadUsers() {
        return '';
    }


    static async loadReport(reportId) {
        return {
            questions: [{
            ref: 'UlkKrBxbI2m1',
            key: 'How good',
            value: 2
        }, {
            ref: 'FnkrDwaGeauK',
            key: 'City',
            value: 'A'
        }, {
            ref: 'tXKSSANrdGW0',
            key: 'A choice',
            value: 'A'
        }, {
            ref: 'kTUGCk0ROpcd',
            key: 'Tell us',
            value: 'dsadsad'
        }],
        users: [
            {
                ref: 'user1',
                name: 'Tom',
                access: true
            },
            {
                ref: 'user2',
                name: 'Louis',
                access: false
            }
        ]};
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