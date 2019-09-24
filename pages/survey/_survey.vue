<template>
  <div>
    <h1>The survey {{ form.name }}</h1>
    <no-ssr>
      <survey :id="form.id"></survey>
    </no-ssr>
  </div>
</template>

<script>
  export default {
    asyncData: (context) => {
      return {
        form: context.form
      }
    },
    components: {
      'survey': () => import('@/pages/survey/Survey.vue')
    }
  }
</script>
