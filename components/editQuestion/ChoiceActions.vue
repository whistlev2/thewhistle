<template>
    <template>
        <v-select v-model="jump" :items="$attrs.jumpOptions" v-on:change="updateJump" />
        <v-btn action="addJump" v-else>Add option jump</v-btn>
        <v-btn action="openAddChoiceModal" v-if="$attrs.question.type != 'yes_no'">Add option</v-btn>
    </template>
</template>
<script>
export default {
    data() {
        return {
            jump: this.getJump()
        }
    },
    methods: {
        //TODO: Move to back-end
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
        },
        updateJump() {
            /* <form action="/api/edit-form/update-option-jump" class="v-form">
                <input type="hidden" name="formSlug" :value="$attrs.surveyID" />
                <input type="hidden" name="question" :value="$attrs.question.ref" />
                <input type="hidden" name="choiceRef" :value="$attrs.choice" />
                <select v-model="jump" name="jump" style="background-color:lightgray;">
                    <option v-for="question in $attrs.jumpOptions" :value="question.ref" :key="question.ref" name="jump">{{ question.text }} ▼</option>
                </select>
                <v-btn type="submit">Update jump</v-btn>
            </form> */
        }
    }
}
</script>
