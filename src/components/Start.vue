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

    import Forms from '../assets/sampleRegistrationForm'

    export default {
        name: "Start",
        components: {Title, Layout},

        data() {
            return {
                guests: 0,
            }
        },

        beforeMount() {
            this.guests = this.$moment('04-2019', 'MM-YYYY').daysInMonth()
        },

        methods: {
            getGuests(month) {
                this.guests = statistics.getTaxByMonth(month)
            }
        }
    }
</script>