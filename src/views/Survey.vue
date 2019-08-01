<template>
  <div>
    <h1>The survey</h1>
    <div id="my-embedded-typeform"></div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue';

import * as typeformEmbed from '@typeform/embed'

@Component({})
class App extends Vue {
    mounted() {
        const url =`https://admin.typeform.com/to/${this.$route.params.id}`;
        console.log(url);

          var el = document.getElementById("my-embedded-typeform");

     // When instantiating a widget embed, you must provide the DOM element
     // that will contain your typeform, the URL of your typeform, and your
     // desired embed settings
     typeformEmbed.makeWidget(el, url, {
       hideFooter: true,
       hideHeaders: true,
       opacity: 0
     });
        // axios
        //     .get(url)
        //     .then(response => {
        //         this.setReports(response.data);
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
    }
}
export default App;
</script>
