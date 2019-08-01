<template>
    <div>
        <b-navbar toggleable="lg" type="light" class="navbar">
            <b-navbar-brand href="#">
                <img class="pl-5"
                     id="navbar-pic"
                     height="50"
                     src="../../assets/Constance_logo.png"
                     alt="Konstanz Logo"
                     @click="showDisclaimerOrDashboard">
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

                <b-navbar-nav class="ml-auto pr-5">
                    <!-- Vermieter und Stadt -->
                    <b-nav-item v-if="$store.getters.role === 'landlord' || $store.getters.role === 'city'">
                        <v-btn :to="{name: 'Meldescheine'}">
                            Meldescheine
                        </v-btn>
                    </b-nav-item>

                    <!-- Vermieter -->
                    <b-nav-item id="new-form" v-if="$store.getters.role === 'landlord'">
                        <v-btn :to="{name: 'MeldescheinAnlegen'}">
                            neuer Meldeschein
                        </v-btn>
                    </b-nav-item>

                    <!-- Stadt -->
                    <template v-if="$store.getters.role === 'city'">
                        <b-nav-item>
                            <v-btn :to="{name: 'Betriebe'}">
                                Betriebe
                            </v-btn>
                        </b-nav-item>
                        <b-nav-item>
                            <v-btn :to="{name: 'BetriebAnlegen'}">Betrieb anlegen</v-btn>
                        </b-nav-item>
                        <b-nav-item>
                            <v-btn :to="{name: 'Statistiken'}">
                                Statistiken
                            </v-btn>
                        </b-nav-item>
                        <b-nav-item>
                            <v-btn :to="{name: 'rechnungErstellen'}">
                                Rechnung erstellen
                            </v-btn>
                        </b-nav-item>
                    </template>

                    <b-nav-item v-if="$store.getters.role === 'landlord' || $store.getters.role === 'city'">
                        <v-btn @click="deleteRoleInState" :to="{name: 'index'}">
                            Abmelden
                        </v-btn>
                    </b-nav-item>
                    <template v-else>
                        <b-nav-item>
                            <v-btn :to="{name: 'login'}">
                                Vermieter-Login
                            </v-btn>
                        </b-nav-item>
                        <b-nav-item>
                            <v-btn :to="{name: 'Stadtlogin'}">Stadt-Login</v-btn>
                        </b-nav-item>
                    </template>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "Navbar",

        methods: {
            deleteRoleInState: function () {
                this.$store.commit('changeRole', '')
            },
            showDisclaimerOrDashboard() {
                if (this.$store.getters.role === 'landlord' || this.$store.getters.role === 'city') {
                    this.$router.push({path: '/start'});

                } else {
                    this.$router.push({path: '/'});
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #new-form {
        color: darkgreen;
    }

    .navbar {
        z-index: 100;
        background-color: #FFFFFF;
        box-shadow: 0 8px 5px 0 rgba(0, 0, 0, 0.25);
    }
</style>