<template>
  <div>
    <nuxt v-if="showPage" />
    <login-form v-else></login-form>
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm'

export default {
  data() {
    var path = this.$route.path
    var showPage = this.$store.state.authUser || path.includes('survey') || path.includes('htmlform')
    return { showPage: showPage }
  },
  components: { LoginForm }
}
</script>
