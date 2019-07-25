<template>
    <div>
        <b-navbar toggleable="lg" type="light" class="navbar">
            <b-navbar-brand href="#">
                <router-link to="/">
                    <img class="pl-5" id="navbar-pic" height="50" src="../../assets/Constance_logo.png"
                         alt="Konstanz Logo">
                </router-link>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

                <b-navbar-nav class="ml-auto pr-5">
                    <!-- Vermieter und Stadt -->
                    <b-nav-item v-if="$store.getters.role === 'landlord' || $store.getters.role === 'city'">
                        <router-link to="/meldescheine">Meldescheine</router-link>
                    </b-nav-item>

                    <!-- Vermieter -->
                    <b-nav-item id="new-form" v-if="$store.getters.role === 'landlord'">
                        <router-link to="/meldeschein/anlegen">neuer Meldeschein</router-link>
                    </b-nav-item>

                    <!-- Stadt -->
                    <b-nav-item v-if="$store.getters.role === 'city'">
                        <router-link to="/Betriebe">Betriebe</router-link>
                    </b-nav-item>

                    <b-nav-item v-if="$store.getters.role === 'landlord' || $store.getters.role === 'city'">
                        <span @click="deleteRoleInState">
                            <router-link to="/">
                                Abmelden
                                </router-link>
                        </span>
                    </b-nav-item>
                    <b-nav-item v-else>
                        <router-link to="/login">Login</router-link>
                    </b-nav-item>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "Navbar",

        methods:{
            deleteRoleInState: function(){
                this.$store.commit('change', '')
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