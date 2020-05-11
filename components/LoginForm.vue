<template>
  <div class="wrapper">
        <form  @submit.prevent="auth">
          <p class="error" v-if="form.error">{{ form.error }}</p>
          <p>Email: <input type="text" v-model="form.email" name="email" /></p>
          <p>Password: <input type="password" v-model="form.password" name="password" /></p>
          <button type="submit">Sign in</button>
        </form>
      </div>
</template>

<script>
const getDefaultData = () => ({
    modalShown: false,
    form: {
        error: null,
        email: '',
        password: ''
    }
})

export default {
    data: getDefaultData,
    methods: {
        reset() {
            const d = getDefaultData()
            Object.keys(d).forEach((key) => {
                this.$data[key] = d[key]
            })
        },
        async auth() {
            try {
                //LOGIN
            } catch (e) {
                this.form.error = e.message
            }
        },
       
    }
}
</script>

<style>
a {
    text-decoration: underline;
}

.wrapper {
    position: relative;
}

.modal {
    position: absolute;
    left: -1px;
    top: -1px;
    border: 1px solid #888;
    background: #ddd;
    padding: .4em .8em;
}

.modal form {
    margin: 1em auto .2em;
}

.modal .form-switch {
    float: right;
}

.error {
    color: red;
}
</style>
