<template>
    <div>
        REPORTS
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
        return {}
    },
  asyncData (context) {
      return context.reports.data;
      
  },
  fetch () {
  },
  head () {
    // Set Meta Tags for this Page
  },
  // and more functionality to discover

}
</script>
