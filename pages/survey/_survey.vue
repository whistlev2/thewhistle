<template>
    <div>
        <h1>{{ form.title }}</h1>
        <no-ssr style="height: 100%">
            <!-- TODO: Make work for multiple sections -->
            <survey :id="form.sections[0].typeform.id"></survey>
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
