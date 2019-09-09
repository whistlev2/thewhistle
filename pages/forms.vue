<template>
    <div>
        FORMS
  <v-data-table
  :headers="headers"
  :items="items"
  :items-per-page="5"
  class="elevation-1"
></v-data-table>
    </div>
</template>


<script>

export default {

    data() {
        return {
            headers: [
                {
                    text: 'Name',
                    value: 'ref1'
                },
                {
                    text: 'Email',
                    value: 'ref2'
                }
            ],
            items: [
                {
                    ref1: 'Tom',
                    ref2: 'tjcberman@gmail.com'
                },
                {
                    ref1: 'Louis',
                    ref2: 'lmcs97@gmail.com'
                }
            ]
        }
    },
  asyncData (context) {
  },
  fetch () {
  },
  head () {
    // Set Meta Tags for this Page
  },
  // and more functionality to discover

}
</script>
