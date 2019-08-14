<template>
    <div>
        <question v-for="question in questions" :json="question" v-bind:key="question.id">
        </question>
    </div>
</template>

<script>
    export default {
        asyncData: (context) => {
            return {
                questions: context.questions
            }
        },
        components: {
          'question': () => import('@/components/questions/Question.vue')
        }
    }
</script>