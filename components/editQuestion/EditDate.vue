<template>
<div class="v-text-field__slot">
  DATE
  <p>{{ $attrs.question.title }}</p>
  <input
      type="text"
      :name="$attrs.question.field_title"
      style="border:1px solid red"
  />
</div>
</template>
<script>
export default {}
</script>
