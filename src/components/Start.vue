<template>
    <CityDash v-if="this.$store.getters.role === 'city'"></CityDash>
    <Landlord-dash v-else-if="this.$store.getters.role === 'landlord'"></Landlord-dash>

    <h1 v-else>Not logged in!</h1>

</template>

<script>
    import CityDash from './city-dashboard';
    import LandlordDash from './landlord-dashboard';

    export default {
        name: "Start",
        components: {CityDash, LandlordDash}
    }
</script>