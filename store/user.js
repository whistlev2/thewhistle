export const state = () => (null)

export const mutations = {
    set(state, user) {
        state.firstName = user.firstName;
        state.surname = user.surname;
        state.email = user.email;
    }
}

export const getters = {
    get(state) {
        console.log('NOW GETTING USER', state);
        return state
    }
}