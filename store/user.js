export const state = () => ({
    id: null,
    firstName: null,
    surname: null,
    email: null,
    loggedIn: false,
    orgs: []
})

export const mutations = {
    set(state, user) {
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
        return state
    },

    getNewFormOrgs(state) {
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