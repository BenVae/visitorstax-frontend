<template>
    <Layout>
        <Title name="Startseite"/>
        <v-container>
        </v-container>
    </Layout>
</template>

<script>
    import Layout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    import * as statistics from "./utils/statistics"
    import apexchart from 'vue-apexcharts'

    export default {
        name: "Start",
        components: {Title, Layout, apexchart},

        data() {
            return {
                districtAnalysis: {}
            }
        },

        beforeMount() {
            this.makeDistrictAnalysis('01-04-2019', '30-04-2019')
        },

        methods: {
            makeDistrictAnalysis(start, end) {
                let data = statistics.getGuestInPeriodSortedByDistrict(start, end)
                this.districtAnalysis["chartOptions"] = {}
                this.districtAnalysis["chartOptions"]["labels"] = Object.keys(data)
                this.districtAnalysis["series"] = Object.values(data)
            }
        }
    }
</script>