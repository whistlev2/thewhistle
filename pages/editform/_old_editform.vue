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
import { Component, Vue } from 'vue-property-decorator'
import EditQuestion from '../../components/editQuestion/EditQuestion.vue';
@Component({
  components: {
    'EditQuestion': EditQuestion,
    'middleware': ['load.js']
  }
})
class App extends Vue {
  // question: Object = {};
  asyncData (context) {
    console.log(context);
  }
  mounted() {
    console.log(this);
  }
}
// export default {
//   asyncData (context) {
//   console.log(context.survey)
//   return {
//     survey: context.survey
//  }
// }
// }
export default App;

</script>
