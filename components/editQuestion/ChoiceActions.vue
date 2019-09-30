<template>
    <div>
        
        <div v-if="jump">
            Option jump:
            <form action="/api/edit-form/update-option-jump" class="v-form">
                <input type="hidden" name="formSlug" :value="$attrs.surveyID" />
                <input type="hidden" name="question" :value="$attrs.question.ref" />
                <input type="hidden" name="choiceRef" :value="$attrs.choice" />
                <select v-model="jump" name="jump" style="background-color:lightgray;">
                    <option v-for="question in $attrs.jumpOptions" :value="question.ref" :key="question.ref" name="jump">{{ question.text }} ▼</option>
                </select>
                <v-btn type="submit">Update jump</v-btn>
            </form>
        </div>
        <v-btn action="addOptionJump" v-else>Add option jump</v-btn>
        <br>
        <v-btn action="addChoice" v-if="$attrs.question.type != 'yes_no'">Add option</v-btn>
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
