<template>
  <div>
      <EditShortText :question="$attrs.question" :surveyID="$attrs.surveyID" v-if="$attrs.question.type == 'short_text'" />
      <EditDate :question="$attrs.question" :surveyID="$attrs.surveyID" v-if="$attrs.question.type == 'date'" />
      <EditLongText :question="$attrs.question" :surveyID="$attrs.surveyID" v-if="$attrs.question.type == 'long_text'" />
      <EditMultipleChoice :question="$attrs.question" :surveyID="$attrs.surveyID" v-if="$attrs.question.type == 'multiple_choice'" />
      <EditDropdown :question="$attrs.question" :surveyID="$attrs.surveyID" v-if="$attrs.question.type == 'dropdown'" />
      <EditFileUpload :question="$attrs.question" :surveyID="$attrs.surveyID" v-if="$attrs.question.type == 'file_upload'" />
  </div>
</template>
<script>
// import { Component, Vue } from 'vue-property-decorator'

import EditShortText from './EditShortText.vue';
import EditLongText from './EditLongText.vue';
import EditMultipleChoice from './EditMultipleChoice.vue';
import EditDate from './EditDate.vue';
import EditDropdown from './EditDropdown.vue';
import EditFileUpload from './EditFileUpload.vue'


export default {
  components: {
    EditShortText,
    EditLongText,
    EditMultipleChoice,
    EditDate,
    EditDropdown,
    EditFileUpload
  }
}
</script>
