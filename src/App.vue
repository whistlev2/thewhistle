<template>
    <v-app>
        <v-toolbar tabs color="#033549" dark dense class="hidden-sm-and-down">
            <img src="logo.png" />
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-tabs color="transparent">
                    <v-tab to="/reports">Reports</v-tab>
                    <v-tab to="/forms">Forms</v-tab>
                    <v-tab to="/users">Users</v-tab>
                    <v-tab to="logout">Logout</v-tab>
                </v-tabs>
            </v-toolbar-items>
        </v-toolbar>
        <v-toolbar tabs color="#033549" dark dense class="hidden-md-and-up">
            <img src="logo.png" />
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-tabs color="transparent">
                    <v-tab to="/reports"><v-icon>list_alt</v-icon></v-tab>
                    <v-tab to="/forms"><v-icon>edit</v-icon></v-tab>
                    <v-tab to="/users"><v-icon>person</v-icon></v-tab>
                    <v-tab to="logout"><v-icon>exit_to_app</v-icon></v-tab>
                </v-tabs>
            </v-toolbar-items>
        </v-toolbar>
        <router-view> </router-view>
    </v-app>
</template>
