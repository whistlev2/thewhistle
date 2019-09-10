<template>
    <div>
        
        <div v-if="jump">
            Option jump:
            <form action="/update-field" class="v-form">
                <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
                <input type="hidden" name="questionID" :value="$attrs.question.id" />
                <input type="hidden" name="choiceRef" :value="$attrs.choice" />
                <select v-model="jump" style="background-color:lightgray;">
                    <option v-for="question in $attrs.jumpOptions" :value="question.ref" :key="question.ref" name="jump">{{ question.text }} ▼</option>
                </select>
                <v-btn type="submit">Update jump</v-btn>
            </form>
        </div>
        <v-btn action="addOptionJump" v-else>Add option jump</v-btn>
        <br>
        <v-btn action="addChoice">Add option</v-btn>
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
                if (logic[i].condition.op == 'is') {
                    if (logic[i].condition.vars[1].value == this.$attrs.choice) {
                        return logic[i].details.to.value;
                    }
                }
            }
            return null;
        }
    }
}
</script>
