<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span>Vuetify</span>
                <span class="font-weight-light">{{ apiData }} DESIGN</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                flat
                href="https://github.com/vuetifyjs/vuetify/releases/latest"
                target="_blank"
            >
                <span class="mr-2">Latest Release</span>
            </v-btn>
        </v-toolbar>

        <v-content>
            <HelloWorld />
        </v-content>
    </v-app>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
        HelloWorld,
    },
})
class App extends Vue {
    apiData: string = '';

    getApiData(): string {
        return this.apiData;
    }

    setApiData(apiData: string): void {
        this.apiData = apiData;
    }

    mounted() {
        const url = 'http://api.' + process.env.VUE_APP_SERVER_DOMAIN + '/test';
        axios
            .get(url)
            .then(response => {
                this.setApiData(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }
}
export default App;

</script>
