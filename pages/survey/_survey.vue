<template>
    <div>
        <h1>{{ form.name }}</h1>
        <no-ssr style="height: 100%">
            <survey :id="form.id"></survey>
        </no-ssr>
    </div>
</template>

<script>
//TODO: Make work for multiple sections
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
