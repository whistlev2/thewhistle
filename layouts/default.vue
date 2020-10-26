<template>
    <v-app light>
        <MenuBar v-if="loggedIn" :logout="logout" />
        <!-- Make not logged in menu bar and implement mobile menu -->
        <v-main>
            <v-container>
              <nuxt />
            </v-container>
        </v-main>
        <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
        </v-navigation-drawer>
    </v-app>
</template>
<script>
import MenuBar from '../components/MenuBar.vue'
import MobileMenuBar from '../components/MobileMenuBar.vue'

import axios from 'axios';

export default {
    components: {
        MenuBar,
        MobileMenuBar
    },
    data() {
        //TODO: Dynamically change mobile menu bar
        var path = this.$route.path
        //var showPage = this.$store.state.authUser || path.includes('survey') || path.includes('htmlform')
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'The Whistle',
            windowWidth: 0,
            loggedIn: this.isLoggedIn()
        }
    },
    created() {
        this.$nuxt.$on('login', this.recomputeLoggedIn);
    },

    mounted() {
        window.onresize = () => {
            this.windowWidth = window.innerWidth
        }
    },
    computed: {
        
    },
    methods: {
        logout() {
            axios.post('api/auth/logout').then(() => {
                this.$cookies.remove('user');
                this.$cookies.remove('authtoken')
                this.recomputeLoggedIn();
                this.$router.push('/login');
            }).catch(() => {
                //TODO: Handle this
            });
        },

        isLoggedIn() {
            try {
                let user = this.$cookies.get('user');
                return user.id ? true : false;
            } catch (err) {
                return false;
                //TODO: Redirect to login
            }
        },

        recomputeLoggedIn() {
            this.loggedIn = this.isLoggedIn();
        }
    }
}
</script>
