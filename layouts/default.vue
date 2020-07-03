<template>
    <v-app light>
        <MenuBar />
        <v-content>
            <v-container>
              <nuxt />
            </v-container>
        </v-content>
        <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
        </v-navigation-drawer>
    </v-app>
</template>
<script>
import MenuBar from '../components/MenuBar.vue'
import MobileMenuBar from '../components/MobileMenuBar.vue'
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
