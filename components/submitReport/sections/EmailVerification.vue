<template>
    <div>
        <v-form v-model="validEmail">
            <v-text-field v-model="email" label="Email" :rules="emailRules" outlined></v-text-field>
        </v-form>
        <v-btn outlined :disabled="!validEmail" @click="sendVerification" class="blueBtn">{{ emailSent ? 'Resend' : 'Send' }} Verification Code</v-btn>
        <div v-if="emailSent">
            <v-form v-model="validCode">
                <p v-if="incorrectVerificationCode" class="err">
                    Incorrect Verification Code. Please Try Again.
                </p>
                <v-text-field v-model="verificationCode" @change="incorrectVerificationCode = false" :rules="verificationCodeRules" outlined></v-text-field>
            </v-form>
            <v-btn outlined :disabled="!validCode" @click="verifyCode" class="blueBtn">Verify Code</v-btn>
        </div>
    </div>
</template>
<style scoped>
.blueBtn {
    background-color: #50addb;
    color: white;
}
.err {
    color: red;
}
</style>
<script>
import axios from 'axios';

export default {

    data() {
        return {
            email,
            verificationCode,
            emailSent: false,
            incorrectVerificationCode: false,
            emailRules: [() => this.validEmail || 'Invalid email address', () => this.validEnding || ('Email ending must match ' + this.$this.attrs.section.allowedEndings.join(', ')) ],
            verificationCodeRules: [() => this.verificationCode.length == 6 || 'Must be 6 characters long', () => isAlphanumeric(this.verificationCode) || 'Must only contain letters and numbers']
        }
    },

    computed: {
        validEmail: function () {
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return emailRegex.test(this.email);
        },
        validEnding: function () {
            if (this.$attrs.section.allowedEndings.length == 0) {
                return true;
            } else {
                for (let i = 0; i < this.$attrs.section.allowedEndings.length; i++) {
                    if (this.email.endsWith(this.$attrs.section.allowedEndings[i])) {
                        return true;
                    }
                }
                return false;
            }
        }
    },

    methods: {

        isAlphanumeric(value) {
            const regex = /^[a-z0-9]+$/i;
            return regex.test(value);
        },

        sendVerification() {
            let url = `/api/report/send-email-verification/${this.$attrs.sessionID}`;
            
            let data = {
                email: this.email
            };

            axios.post(url, data)
                .then(() => {
                    this.emailSent = true;
                })
                .catch(() => {
                    //TODO: Handle other errors
                })
        },

        verifyCode() {
            let url = `/api/report/submit-section/${this.$attrs.sessionID}`;
            
            let data = {
                type: 'email-verification',
                test: this.$attrs.test,
                verificationCode: this.verificationCode
            };

            axios.post(url, data)
                .then((response) => {
                    this.$emit('complete', response.data);
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status == '401') {
                            this.incorrectVerificationCode = true;
                        }
                        //TODO: Handle other errors
                    }
                })
        }
    }
}
</script>
