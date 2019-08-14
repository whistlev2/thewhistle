<template>
    <div>
        <h1>Hi</h1>
        <form action="/store" class="v-form">
            <template v-for="question in survey">
                <EditQuestion :question="question"/>
            </template>
            <input type="submit" value="Submit" />
        </form>
    </div>
</template>

<script>
import EditQuestion from '../../components/editQuestion/EditQuestion.vue'
export default {
  components: {
    EditQuestion
  },
  asyncData (context) {
    return {
      survey: context.survey
   }
 }
}
</script>
