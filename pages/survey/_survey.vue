<template>
    <div>
        <h1>{{ form.name }}</h1>
        <no-ssr style="height: 100%">
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
