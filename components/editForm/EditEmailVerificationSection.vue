<template>
    <div>
        <div v-for="(ending, index) in $attrs.section.json.allowedEndings" :key="index">
            <v-text-field label="Email Ending" outlined v-model="$attrs.section.json.allowedEndings[index]"
                @change="updateEndings" :rules="validText" placeholder="@example.com"></v-text-field>
            <v-btn outlined @click="removeEnding(index)" class="blueBtn">Remove Ending</v-btn>
            <br>
            <br>
        </div>
        <v-btn outlined @click="$attrs.section.json.allowedEndings.push('')" class="blueBtn">Add Allowed Ending</v-btn>
    </div>
</template>
<style scoped>
.blueBtn {
    background-color: #50addb;
    color: white;
}
</style>
<script>

import axios from 'axios';

export default {
    
    data() {
        return {
            validText: [ v => !!v || 'Required' ]
        }
    },

    computed: {
    },

    methods: {
        updateEndings() {
            let url = `/api/edit-form/${this.$attrs.section.sectionID}/update-section`;
            let data = {
                section: this.$attrs.section.json
            };
            axios.patch(url, data).then((response) => { 
                //TODO: Handle errors
            });
        },

        removeEnding(index) {
            this.$attrs.section.json.allowedEndings.splice(index, 1);
            this.updateEndings();
        },
        

    }

}
</script>
