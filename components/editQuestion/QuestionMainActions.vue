<template>
    <div>
    </div>
</template>
<script>

import AddQuestionModal from './AddQuestionModal.vue';

export default {
    components: {
        AddQuestionModal
    },
    data() {
        return {
            showBefore: false,
            showAfter: false
        }
    },
    methods: {
        closeBeforeModal() {
            this.showBefore = false;
        },
        closeAfterModal() {
            this.showAfter = false;
        }
    }
}
</script>
