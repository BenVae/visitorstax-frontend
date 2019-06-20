<template>
    <div id="app">
        <Navbar/>
        <Menubackground/>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar";
    import Menubackground from "./components/Layout";

    export default {
        components: {Menubackground, Navbar}
    }

</script>


<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        position: fixed;
        background: url("assets/Constance.png");
        background-size: cover;
        height: 100vh;
        width: 100vw;
    }
</style>
