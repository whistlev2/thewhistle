import axios from 'axios'

export const state = () => ({
    authUser: null
})

export const mutations = {
    SET_USER: function (state, user) {
        console.log('THIS IS NOT IT', user);
        state.authUser = user
    }
}

export const actions = {
    // nuxtServerInit is called by Nuxt.js before server-rendering every page
    nuxtServerInit({ commit }, { req }) {
        if (req.user) {
            console.log('INIT')
            commit('SET_USER', req.user)
        }
    },
    async login({ commit }, { email, password }) {
        console.log('STORE actions')
        if (!email || !password) throw new Error('Email and password are required')
        try {
            const username = email
            const {
                data
            } = await axios.post('/api/auth/login', {
                username,
                password
            })
            
            //commit('SET_USER', data)
        } catch (error) {
            console.log(error)
            throw new Error('Wrong email or password')
        }
    },
    async register({
        commit
    }, {
        email,
        password,
        organisation_id
    }) {
        console.log('MAKE NEW USER')
        if (!email || !password) throw new Error('Email and password are required')
        try {
            const {
                data
            } = await axios.post('/api/auth/register', {
                email,
                password,
                organisation_id
            })
            commit('SET_USER', data)
        } catch (error) {
            switch (error.response.status || 500) {
                case 409:
                    throw new Error('Such email is already registered')
                case 500:
                    throw new Error('Internal server error')
            }
        }
    },
    async logout({
        commit
    }) {
        const {
            data
        } = await axios.post('/api/auth/logout')
        if (data.ok) commit('SET_USER', null)
    },
    async changePassword({
        commit
    }, {
        currentPassword,
        newPassword
    }) {
        if (!currentPassword || !newPassword) throw new Error('All fields are required')
        try {
            await axios.patch('/api/auth', {
                currentPassword,
                newPassword
            })
            commit('SET_USER', null)
        } catch (error) {
            throw new Error('Wrong password')
        }
    }
}