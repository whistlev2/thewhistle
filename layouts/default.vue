<template>
    <v-app light>
        <MobileMenuBar v-if="windowWidth < 800" />
        <MenuBar v-else />
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
        return {
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
