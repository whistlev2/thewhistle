<template>
    <div>
        <h2>{{ $attrs.question.title }}</h2>
        <EditShortText :question="$attrs.question" :surveyID="$attrs.surveyID" v-if="$attrs.question.type == 'short_text'" />
        <EditDate :question="$attrs.question" :surveyID="$attrs.surveyID" v-if="$attrs.question.type == 'date'" />
        <EditLongText :question="$attrs.question" :surveyID="$attrs.surveyID" v-if="$attrs.question.type == 'long_text'" />
        <EditMultipleChoice :question="$attrs.question" :surveyID="$attrs.surveyID" :jumpOptions="jumpOptions" v-if="$attrs.question.type == 'multiple_choice'" />
        <EditDropdown :question="$attrs.question" :surveyID="$attrs.surveyID" :jumpOptions="jumpOptions" v-if="$attrs.question.type == 'dropdown'" />
        <!-- TODO - test file upload comp works -->
        <EditFileUpload :question="$attrs.question" :surveyID="$attrs.surveyID" v-if="$attrs.question.type == 'file_upload'" />

        <QuestionActions :question="$attrs.question" :surveyID="$attrs.surveyID" :jumpOptions="jumpOptions" />
        <br><br><br>
    </div>
</template>
<script>
// import { Component, Vue } from 'vue-property-decorator'

import EditShortText from './EditShortText.vue';
import EditLongText from './EditLongText.vue';
import EditMultipleChoice from './EditMultipleChoice.vue';
import EditDate from './EditDate.vue';
import EditDropdown from './EditDropdown.vue';
import EditFileUpload from './EditFileUpload.vue';
import QuestionActions from './QuestionActions.vue';

export default {
    components: {
        EditShortText,
        EditLongText,
        EditMultipleChoice,
        EditDate,
        EditDropdown,
        EditFileUpload,
        QuestionActions
    },
    computed: {
        jumpOptions: function () {
            const allQuestions = this.$attrs.allQuestions;
            const questionRef = this.$attrs.question.ref;
            let afterQuestion = false;
            let ret = [];

            for (let i = 0; i < allQuestions.length; i++) {
                if (!afterQuestion) {
                    if (allQuestions[i].ref == questionRef) {
                        afterQuestion = true;
                    }
                } else {
                    ret.push(allQuestions[i]);
                }
            }

            return ret;
        }
    },
}
</script>
