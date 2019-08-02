<template>
    <CityDashboard v-if="this.$store.getters.role === 'city'"></CityDashboard>
    <BusinessDashboard v-else-if="this.$store.getters.role === 'landlord'"></BusinessDashboard>

    <h1 v-else>Not logged in!</h1>

</template>

<script>
    import CityDashboard from './city/CityDashboard';
    import BusinessDashboard from './business/BusinessDashboard';

    export default {
        name: "Start",
        components: {CityDashboard, BusinessDashboard}
    }
</script>