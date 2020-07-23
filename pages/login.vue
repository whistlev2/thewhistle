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
            axios.post('api/auth/login', loginInfo).then((response) => {
                this.$store.commit('user/set', response.data)
                this.$router.push('/');
            }).catch(() => {
                //TODO: Handle this
            });
        }
    }

}
</script>
