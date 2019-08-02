<template>
    <v-app id="app">
        <Navbar/>
        <router-view/>
    </v-app>
</template>

<script>
    import Navbar from "./components/Navbar";

    export default {
        components: {Navbar}
    }

</script>

<style lang="scss">
    * i {
        font-family: 'Material Icons', serif;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: fixed;
        background: url("assets/images/Constance.png");
        background-size: cover;
        height: 100vh;
        width: 100vw;
    }

    .show-pointer {
        cursor: pointer;
    }
</style>
