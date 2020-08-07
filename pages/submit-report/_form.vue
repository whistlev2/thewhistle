<template>
    <div>
        <h1>{{ form.title }}</h1>
        <div v-if="form.sections[0].type=='typeform'">
            <no-ssr style="height: 100%">
                <!-- TODO: Make work for multiple sections and other section types -->
                <Typeform :id="form.sections[0].json.id"></Typeform>
            </no-ssr>
        </div>
        <div v-else-if="form.sections[0].type=='sms'">
            Display SMS Emulator Here
        </div>
    </div>
</template>

<script>
import Typeform from '../../components/submitReport/Typeform.vue'
//TODO: Make work for multiple sections
export default {
    components: {
        Typeform
    },
    asyncData: (context) => {
        return {
            form: context.form
        }
    }
    
}
</script>
