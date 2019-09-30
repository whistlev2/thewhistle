<template>
    <div>
        
        <div v-if="jump">
            Default question jump:
            <form action="/api/edit-form/update-question-jump" class="v-form">
                <input type="hidden" name="formSlug" :value="$attrs.surveyID" />
                <input type="hidden" name="question" :value="$attrs.question.ref" />
                <select v-model="jump" name="jump" style="background-color:lightgray;">
                    <option v-for="question in $attrs.jumpOptions" name="jump" :value="question.ref" :key="question.ref">{{ question.text }} ▼</option>
                </select>
                <v-btn type="submit">Update question jump</v-btn>
            </form>
        </div>
        <v-btn action="addQuestionJump" v-else>Add question jump</v-btn>
        <br><br>
    </div>
</template>
<script>
export default {
    data() {
        return {
            jump: this.getJump()
        }
    },
    methods: {
        getJump() {
            const logic = this.$attrs.question.logic;
            for (let i = 0; i < logic.length; i++) {
                if (logic[i].condition.op == 'always') {
                    return logic[i].details.to.value;
                }
            }
            return null;
        }
    }
}
</script>
