<template>
    <div>
        <LoginForm :login="login" />
    </div>
</template>

<script>

import LoginForm from '../components/LoginForm.vue';
import axios from 'axios';
import { mapMutations } from 'vuex'

export default {
    components: {
        LoginForm
    },

    data() {
        return {}
    },

    methods: {
        login(loginInfo) {
            axios.post('api/auth/login', loginInfo).then(() => {
                this.$store.commit('user/set', {
                    firstName: 'BETTY',
                    surname: 'Test',
                    email: 'lmcs@test.test'
                })
                this.$router.push('/');
            }).catch(() => {
                console.log('NOT LOGGED IN')
                //TODO: Handle this
            });
        }
    }

}
</script>
