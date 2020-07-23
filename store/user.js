export const state = () => ({
    firstName: null,
    surname: null,
    email: null,
    loggedIn: false
})

export const mutations = {
    set(state, user) {
        state.firstName = user.firstName;
        state.surname = user.surname;
        state.email = user.email;
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