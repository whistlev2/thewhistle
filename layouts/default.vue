<template>
    <v-app light>
        <MobileMenuBar v-if="windowWidth < 500" />
        <!-- <MenuBar  /> -->
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

//TODO - NTH - Use favico shortcut icon
import MenuBar from '../components/MenuBar.vue'
import MobileMenuBar from '../components/MobileMenuBar.vue'
export default {
  data() {
    var path = this.$route.path
    var showPage = this.$store.state.authUser || path.includes('survey') || path.includes('htmlform')
    return { showPage: showPage }
  },
  components: { LoginForm }
}
</script>
