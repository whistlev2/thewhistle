<template>
    <div>
        
        <div v-if="jump">
            Default question jump:
            <form action="/update-field" class="v-form">
                <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
                <input type="hidden" name="questionID" :value="$attrs.question.id" />
                <select v-model="jump" style="background-color:lightgray;">
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
