<template>
    <v-form v-model="valid" lazy-validation>
        <v-btn @click="$emit('resend')">Re-send verification code</v-btn><!-- Require captcha here? -->

        <v-text-field
            v-model="verificationCode"
            label="Verification code"
            :rules="[validVerificationCode]"
        />
        <!-- TODO: Login on enter -->

        <v-btn
            @click="authenticate(verificationCode)"
            :disabled="!valid && !$attrs.requireResend"
            >Verify</v-btn
        >
    </v-form>
</template>

<script>
export default {
    data() {
        return {
            valid: false,
            verificationCode: '',
        };
    },
    methods: {
        validVerificationCode(verificationCode) {
            return (
                verificationCode.length == 6 ||
                'Please enter a valid verification code'
            );
        },
    },
    props: ['authenticate'],
};
</script>