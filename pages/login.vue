<template>
    <div>
        <LoginForm :login="login" />
    </div>
</template>

<script>

import LoginForm from '../components/LoginForm.vue';

export default {
    components: {
        LoginForm
    },

    data() {
        return {}
    },

    methods: {
        login(loginInfo) {
            this.$auth.loginWith('local', {
                data: loginInfo
            })
        }
    }

}
</script>
