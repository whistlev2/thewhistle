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
            console.log('Front end about to login')
            this.$auth.loginWith('local', {
                data: loginInfo
            })
        }
    }

}
</script>
