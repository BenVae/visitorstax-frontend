<template>
    <Layout>
        <Title name="Startseite"/>
        <v-container>
            <v-btn @click="getGuests('04-2019')">KLICK</v-btn>
            <span>{{this.guests}}</span>
        </v-container>
    </Layout>
</template>

<script>
    import Layout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    import * as statistics from "./utils/statistics"

    export default {
        name: "Start",
        components: {Title, Layout},

        data() {
            return {
                guests: 0
            }
        },

        methods: {
            getGuests(month) {
                this.guests = statistics.getGuestsByDistrictByMonth(month, '78463')
            }
        }
    }
</script>