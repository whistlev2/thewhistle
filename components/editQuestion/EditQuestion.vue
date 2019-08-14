<template>
  <div>
    <EditShortText />
  </div>
</template>
<script lang="ts">
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
    return {
      question: {title: "hello", field_title: "field"},
      componentType:"EditShortText",
   }
 },
}

// @Component({
//   components: {
//     'EditDate': EditDate,
//     'EditShortText': EditShortText,
//     'EditLongText': EditLongText,
//     'EditMultipleChoice': EditMultipleChoice
//   }
// })
// class EditQuestion extends Vue {
//   question: Object = {};
//   componentType: String = "EditLongText";
//
// }
//
// export default EditQuestion;
</script>
