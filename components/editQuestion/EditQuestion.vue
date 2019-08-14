<template>
  <div>

      <EditShortText :question="$attrs.question" v-if="$attrs.question.type == 'short_text'" />
      <EditLongText :question="$attrs.question" v-else-if="$attrs.question.type == 'long_text'" />
      <EditMultipleChoice :question="$attrs.question" v-else-if="$attrs.question.type == 'multiple_choice'" />

  </div>
</template>
<script>
// import { Component, Vue } from 'vue-property-decorator'

import EditShortText from './EditShortText.vue';
import EditLongText from './EditLongText.vue';
import EditMultipleChoice from './EditMultipleChoice.vue';
// import EditDate from './EditDate.vue';


export default {
  components: {
    EditShortText,
    EditLongText,
    EditMultipleChoice    
  }
}
</script>
