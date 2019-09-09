<template>
<!--     TODO: Make responsive -->
    <v-toolbar flat color="#033549" dark>
        <v-toolbar-title><img src="~/assets/images/logo-128x22.png" /></v-toolbar-title>

        <div class="flex-grow-1"></div>

        <v-toolbar-items>
            <v-btn to="/organisations" text>Organisations</v-btn>
            <v-btn to="/reports" text>Reports</v-btn>
            <v-btn to="/forms" text>Forms</v-btn>
            <v-btn to="/users" text>Users</v-btn>
            <v-btn to="/logout" text>Logout</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>