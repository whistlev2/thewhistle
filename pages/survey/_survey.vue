<template>
  <div>
    <h1>The survey {{ surveyId }}</h1>
    <no-ssr>
      <survey :id="surveyId"></survey>
    </no-ssr>
  </div>
</template>

<script>
  export default {
    asyncData: (context) => {
      return { surveyId: context.survey }
    },
    components: {
      'survey': () => import('@/pages/survey/Survey.vue')
    }
  }
</script>
