<template>
  <div>
    <div id="my-embedded-typeform"></div>
  </div>
</template>

<script>
import * as typeformEmbed from '@typeform/embed'

export default {
  mounted() {
    var surveyId = this.$el.id
    const url =`https://admin.typeform.com/to/${surveyId}`;          
    var el = document.getElementById("my-embedded-typeform");

   // When instantiating a widget embed, you must provide the DOM element
   // that will contain your typeform, the URL of your typeform, and your
   // desired embed settings
   typeformEmbed.makeWidget(el, url, {
     hideFooter: true,
     hideHeaders: true,
     opacity: 0
   });
 }
}
</script>
