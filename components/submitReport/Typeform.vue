<!-- TODO - NTH move to Components file -->
<template>
    <div style="margin: 0 auto; width: 600px;">
        <!-- TODO - ensure height works -->
        <div style="width: 100%; height: 500px;" id="my-embedded-typeform"></div>
    </div>
</template>

<script>
import * as typeformEmbed from '@typeform/embed'

export default {

    mounted() {
        var formID = this.$attrs.id
        const url = `https://admin.typeform.com/to/${formID}`;
        var el = document.getElementById("my-embedded-typeform");

        // When instantiating a widget embed, you must provide the DOM element
        // that will contain your typeform, the URL of your typeform, and your
        // desired embed settings
        // TODO: add callback for submit button
        typeformEmbed.makeWidget(el, url, {
            hideFooter: true,
            hideHeaders: true,
            opacity: 0
        });
    }
}
</script>
