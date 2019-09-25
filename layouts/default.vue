<template>
    <v-app light>
        <MenuBar />
        <v-content>
            <v-container>
              <nuxt />
              <!-- <nuxt v-if="showPage" />
              <login-form v-else></login-form> -->
            </v-container>
        </v-content>
        <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
        </v-navigation-drawer>
    </v-app>
</template>
<script>
import LoginForm from '~/components/LoginForm'
import MenuBar from '../components/MenuBar.vue'
import MobileMenuBar from '../components/MobileMenuBar.vue'
export default {
    components: {
        LoginForm,
        MenuBar,
        MobileMenuBar
    },
    data() {
      var path = this.$route.path
      var showPage = this.$store.state.authUser || path.includes('survey') || path.includes('htmlform')
        return {
            showPage: showPage,
            clipped: false,
            drawer: false,
            fixed: false,
            items: [{
                    icon: 'apps',
                    title: 'Welcome',
                    to: '/'
                },
                {
                    icon: 'bubble_chart',
                    title: 'Inspire',
                    to: '/inspire'
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js',
            windowWidth: 0
        }
    },
    mounted() {
        window.onresize = () => {
            this.windowWidth = window.innerWidth
        }
    }
}
</script>
