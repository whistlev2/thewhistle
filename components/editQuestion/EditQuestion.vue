<template>
  <div>
    <EditShortText />
  </div>
</template>
<script>
// import { Component, Vue } from 'vue-property-decorator'

import EditShortText from './EditShortText.vue';
// import EditLongText from './EditLongText.vue';
// import EditMultipleChoice from './EditMultipleChoice.vue';
// import EditDate from './EditDate.vue';

export default {
  components: {
    EditShortText
  },
  asyncData (context) {
    console.log(context);
    return {}
 }
}
</script>
