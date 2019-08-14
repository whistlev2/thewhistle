<template>
<div class="v-text-field__slot">
    <p>{{ $attrs.question.title }}</p>
</div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
  class App extends Vue {
    question: Object = {};
  }
  export default App;
</script>
