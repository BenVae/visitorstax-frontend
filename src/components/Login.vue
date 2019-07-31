<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6 lg4>
                <v-card rounded-lg>
                    <v-card-text>
                        <h3 class="card-title-custom-login text-xs-center">
                            Vermieter Login
                        </h3>
                        <v-form>
                            <v-text-field
                                    autofocus
                                    prepend-icon="person"
                                    label="Betriebsnummer"
                                    v-model="loginData.username"
                                    type="text"
                            ></v-text-field>
                            <v-text-field
                                    prepend-icon="lock"
                                    label="Password"
                                    v-model="loginData.password"
                                    type="password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn small block color="blue-grey" class="btn_login_custom" dark @click="saveRole">Login
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {checkLoginData} from "../script/loginService";

    export default {
        name: "Login",
        methods: {
            saveRole() {
                if (checkLoginData(this.loginData)) {
                    this.$store.commit('changeRole', 'landlord');
                    this.$store.commit('changeUsername', this.loginData.username);
                    this.$router.push({path: '/start'});
                } else {
                    alert("Passwort und Username sind nicht bekannt")
                }
            }
        },
        data() {
            return {
                loginData: {
                    username: "",
                    password: ""
                }
            }
        }
    }
</script>

<style lang="scss">

    .btn_login_custom {
        border: none !important;
    }

    .v-btn.btn_login_custom:hover,
    .v-btn.btn_login_custom:active,
    .v-btn.btn_login_custom:focus {
        background-color: #EF5350 !important;
    }

    .card-title-custom-login {
        margin-bottom: 8%;
        border-bottom: 3px solid #E40521;
    }

</style>