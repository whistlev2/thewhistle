<template>
  <v-form v-model="valid">

    <v-text-field v-model="loginInfo.email" 
                  label="Email" 
                  :rules="[ validEmail ]" />

    <v-text-field v-model="loginInfo.password"
                  label="Password"
                  type="password" 
                  :rules="[ validPassword ]" />

    <v-btn @click="login(loginInfo)" :disabled="!valid">Login</v-btn>
  </v-form>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            loginInfo: {
                email: '',
                password: ''
            }

        }
    },
    methods: {
        validPassword(password) {
            return !!password || "Please enter a password";
        },
        validEmail(email) {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(email) || "Please enter a valid email";
      
        }
    },
    props: ["login"]
}
</script>