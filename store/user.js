export const state = () => ({
    id: null,
    firstName: null,
    surname: null,
    email: null,
    role: null,
    loggedIn: false
})

export const mutations = {
    set(state, user) {
        state.id = user.id;
        state.firstName = user.first_name;
        state.surname = user.surname;
        state.email = user.email;
        state.role = user.role
        state.loggedIn = true;
    },

    clear(state) {
        delete state.firstName;
        delete state.surname;
        delete state.email;
        state.loggedIn = false;
    }
}

export const getters = {
    get(state) {
        return state
    }
}