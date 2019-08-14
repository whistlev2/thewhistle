<template>
  <div>
    <p id="my-embedded-typeform">{{ json }}</p>
  </div>
</template>

<script>
export default {
  props: [
    'json'
  ],
  mounted() {
    console.log(this.$el)
 }
}
</script>
