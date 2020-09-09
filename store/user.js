let Cookies = require('js-cookie');

function getUser() {
    try {
        let userString = Cookies.get('user');
        return JSON.parse(userString);
    } catch (err) {
        //TODO: Redirect to login
        return {
            id: null,
            firstName: null,
            surname: null,
            email: null,
            loggedIn: false,
            orgs: []
        };
    }
}

export const state = () => {
    return getUser()
}

export const mutations = {
    set(state) {
        let user = getUser()
        state.id = user.id;
        state.firstName = user.first_name;
        state.surname = user.surname;
        state.email = user.email;
        state.orgs = user.orgs;
        state.loggedIn = true;
    },

    clear(state) {
        delete state.id;
        delete state.firstName;
        delete state.surname;
        delete state.email;
        delete state.orgs;
        state.loggedIn = false;
    }
}

export const getters = {
    get(state) {
        getUser();
        return state
    },

    getNewFormOrgs(state) {
        getUser();
        let ret = [];
        const orgs = state.orgs;
        for (let i = 0; i < orgs.length; i++) {
            if (orgs[i].active && (orgs[i].role == 'admin' || orgs[i].role == 'editor')) {
                ret.push(orgs[i]);
            }
        }
        return ret;
    }
}