<template>
    <template>
        <form action="/update-field" class="v-form">
            <input type="hidden" name="surveyID" :value="$attrs.surveyID" />
            <input type="hidden" name="questionID" :value="$attrs.question.id" />
            <input type="text" name="title" :value="$attrs.question.title" style="border:1px solid red; width:500px;" />
            <input type="submit" value="Submit" />
        </form>
        <v-list-item-title>
            <v-text-field :label="$attrs.question.ref" outlined v-model="$attrs.question.title" v-on:change="updateQuestion"></v-text-field>
        </v-list-item-title>
    </template>
</template>
<script>
export default {
    
}
</script>
