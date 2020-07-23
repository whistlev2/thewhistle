<template>
    <!--     TODO - Make responsive -->
    <v-card color="#033549" flat height="48px" tile>
        <v-toolbar absolute color="#033549" height="48px" dark>

            <v-toolbar-items>
                <v-btn to="/organisations" text><v-icon>mdi-account-group</v-icon></v-btn>
                <v-btn to="/forms" text><v-icon>mdi-file-document-box-multiple</v-icon></v-btn>
                <v-btn to="/users" text><v-icon>mdi-account</v-icon></v-btn>
                
            </v-toolbar-items>
            <v-spacer />
            <v-btn @click="logout" text><v-icon>mdi-logout-variant</v-icon></v-btn>
        </v-toolbar>
    </v-card>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        logout() {
            axios.post('/api/auth/logout');
        },
    }
}
</script>