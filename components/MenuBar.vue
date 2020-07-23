<template>
    <!-- TODO - NTH  Make responsive -->
    <v-card color="#033549" flat height="48px" tile>
        <v-toolbar absolute color="#033549" height="48px" dark>
            <v-toolbar-title><img src="~/assets/images/logo-128x22.png" /></v-toolbar-title>

            <div class="flex-grow-1"></div>

            <v-toolbar-items>
                <v-btn to="/organisations" text>Organisations</v-btn>
                <v-btn to="/forms" text>Forms</v-btn>
                <v-btn to="/users" text>Users</v-btn>
                <!-- TODO - Add user logic -->
                <!-- TODO - L - Add edit own details and logout in dropdown -->
                <v-btn @click="logout" text>Logout</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </v-card>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        logout() {
            axios.post('api/auth/logout').then(() =>
                this.$router.push('/login')
            );
        },
    }
}
</script>