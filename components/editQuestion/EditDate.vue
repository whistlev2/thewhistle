<template>
<div class="v-text-field__slot">
    DATE
    <p>{{ question.title }}</p>
    <textarea
        rows="4"
        cols="50"
        :name="question.field_title"
        style="border:1px solid red"
    ></textarea>
</div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
  class App extends Vue {
    question: Object = {};
  }
  export default App;
</script>
