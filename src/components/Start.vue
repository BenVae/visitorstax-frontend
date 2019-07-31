<template>
    <Layout>
        <Title name="Startseite"/>
        <v-container grid-list-lg>
            <v-layout row>
                <v-flex xs12 sm6 md5 lg3>
                    <v-card min-height="100%">
                        <v-card-title>
                            <span class="title mx-auto">Gäste pro Stadtteil</span>
                        </v-card-title>
                        <apexchart type="pie"
                                   :options="districtAnalysis.chartOptions"
                                   :series="districtAnalysis.series"></apexchart>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm6 md7 lg9>
                    <v-card class="px-5 py-3" min-height="100%">
                        <v-card-title class="mb-4">
                            <span class="title mx-auto">In den letzten {{lastDays}} Tagen...</span>
                        </v-card-title>
                        <v-layout row text-center align-center>
                            <v-flex class="pa-0">
                                <div class="mx-auto font-weight-thin subtitle-1 grey--text">Gäste</div>
                                <div class="mx-auto mt-2 font-weight-light display-1">{{lastDaysGuests}}</div>
                            </v-flex>
                            <v-flex class="pa-0">
                                <div class="mx-auto font-weight-thin subtitle-1 grey--text">Übernachtungen</div>
                                <div class="mx-auto mt-2 font-weight-light display-1">{{lastDaysStays}}</div>
                            </v-flex>
                            <v-flex class="pa-0">
                                <div class="mx-auto font-weight-thin subtitle-1 grey--text">Kurtaxe</div>
                                <div class="mx-auto mt-2 font-weight-light display-1">{{lastDaysTax}}€</div>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex>
                    <v-card class="pb-3">
                        <v-card-title>
                            <span class="title mx-auto">Gäste in den letzten 12 Monaten</span>
                        </v-card-title>
                        <v-layout row>
                            <v-flex xs12 lg6>
                                <apexchart type="bar"
                                           :options="distributionAnalysisBarChart.options"
                                           :series="distributionAnalysisBarChart.series"></apexchart>

                            </v-flex>
                            <v-flex xs12 lg6>
                                <apexchart type="line"
                                           :options="distributionAnalysisLineChart.options"
                                           :series="distributionAnalysisLineChart.series"></apexchart>

                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex>
                    <v-card class="pb-3">
                        <v-card-title>
                            <span class="mx-auto title">Im letzten Jahr...</span>
                        </v-card-title>
                        <v-layout row text-center align-center>
                            <v-flex>
                                <div class="mx-auto font-weight-thin subtitle-1 grey--text">Familien / Reguläre Scheine
                                </div>
                                <div class="mx-auto mt-2 font-weight-light headline">{{lastYearFams}}</div>
                            </v-flex>
                            <v-flex>
                                <div class="mx-auto font-weight-thin subtitle-1 grey--text">Gruppen</div>
                                <div class="mx-auto mt-2 font-weight-light headline">{{lastYearGroups}}</div>
                            </v-flex>
                            <v-flex>
                                <div class="mx-auto font-weight-thin subtitle-1 grey--text">⌀ Aufenthaltsdauer</div>
                                <div class="mx-auto mt-2 font-weight-light headline">{{lastYearAvgStay}} Tage</div>
                            </v-flex>
                            <v-flex>
                                <div class="mx-auto font-weight-thin subtitle-1 grey--text">bester Monat</div>
                                <div class="mx-auto mt-2 font-weight-light headline">{{lastYearBestMonth}} /
                                    {{lastYearBestTax}}€
                                </div>
                            </v-flex>
                            <v-flex>
                                <div class="mx-auto font-weight-thin subtitle-1 grey--text">schlechtester Monat</div>
                                <div class="mx-auto mt-2 font-weight-light headline">{{lasYearWorstMonth}} /
                                    {{lastYearWorstTax}}€
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>
    </Layout>
</template>

<script>
    import Layout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    import * as statistics from "../script/dashboardService"
    import apexchart from 'vue-apexcharts'

    export default {
        name: "Start",
        components: {Title, Layout, apexchart},

        data() {
            return {
                districtAnalysis: {
                    chartOptions: {
                        labels: [],
                        legend: {
                            labels: {
                                colors: ['#FFFFFF']
                            }
                        }
                    },
                    series: []
                },
                distributionAnalysisLineChart: {
                    options: {
                        xaxis: {
                            categories: []
                        },
                        yaxis: [
                            {
                                seriesName: "gesamt",
                                labels: {
                                    formatter: function (val) {
                                        return Math.trunc(val)
                                    }
                                }
                            },
                            {
                                seriesName: "Hotels",
                                show: false,
                                labels: {
                                    formatter: function (val) {
                                        return Math.trunc(val)
                                    }
                                }
                            },
                            {
                                seriesName: "Privat",
                                show: false,
                                labels: {
                                    formatter: function (val) {
                                        return Math.trunc(val)
                                    }
                                }
                            },
                            {
                                seriesName: "Kurtaxe",
                                opposite: true,
                                labels: {
                                    formatter: function (val) {
                                        return val + "€"
                                    }
                                }
                            },
                        ]
                    },
                    series: [
                        {name: "gesamt", data: []},
                        {name: "Hotels", data: []},
                        {name: "Privat", data: []},
                        {name: "Kurtaxe", data: []}
                    ]
                },
                distributionAnalysisBarChart: {
                    options: {
                        chart: {
                            stacked: true
                        },
                        plotOptions: {
                            bar: {
                                horizontal: true
                            }
                        },
                        xaxis: {
                            categories: ["Gesamt", "Hotels", "Privat"]
                        }
                    },
                    series: [
                        {name: "Zahlend", data: []},
                        {name: "Befreit", data: []}
                    ]
                },
                lastDays: 14,
                lastDaysGuests: null,
                lastDaysStays: null,
                lastDaysTax: null,
                lastYearFams: null,
                lastYearGroups: null,
                lastYearAvgStay: null,
                lastYearBestMonth: null,
                lastYearBestTax: null,
                lasYearWorstMonth: null,
                lastYearWorstTax: null
            }
        }
        ,

        beforeMount() {
            statistics.makeDict()

            this.makeDistrictAnalysis(this.$moment().subtract(12, 'months'), this.$moment())
            this.makeDistributionAnalysisLineChart()
            this.makeDistributionAnalysisBarChart(this.$moment().subtract(12, 'months'), this.$moment())

            this.lastDaysGuests = statistics.getGuestsInLastDays(this.lastDays)
            this.lastDaysStays = statistics.getStaysinLastDays(this.lastDays)
            this.lastDaysTax = statistics.getTaxInLastDays(this.lastDays)

            this.getLastYearNumbers()

        },

        methods: {
            makeDistrictAnalysis(start, end) {
                let data = statistics.getGuestInPeriodSortedByDistrict(start, end)
                this.districtAnalysis.chartOptions.labels = Object.keys(data)
                this.districtAnalysis.series = Object.values(data)
            },

            makeDistributionAnalysisLineChart() {

                let self = this
                let i = 11

                let distribution, tax

                for (i; i >= 0; i--) {
                    distribution = statistics.getGuestsInPeriodSortedByType(self.$moment().subtract(i, 'months').startOf('month'), self.$moment().subtract(i, 'months').endOf('month'))
                    tax = statistics.getTaxInPeriod(self.$moment().subtract(i, 'months').startOf('month'), self.$moment().subtract(i, 'months').endOf('month'))

                    self.distributionAnalysisLineChart.series[0].data.push(distribution.gesamt)
                    self.distributionAnalysisLineChart.series[1].data.push(distribution.Hotel)
                    self.distributionAnalysisLineChart.series[2].data.push(distribution.Privat)
                    self.distributionAnalysisLineChart.series[3].data.push(tax)
                    self.distributionAnalysisLineChart.options.xaxis.categories.push(self.$moment().subtract(i, 'months').format('MMM YY'))
                }
            },

            makeDistributionAnalysisBarChart(start, end) {
                let payed = statistics.getPayingGuestsInPeriodSortedByType(start, end)
                let total = statistics.getGuestsInPeriodSortedByType(start, end)

                this.distributionAnalysisBarChart.series[0].data.push(payed.gesamt)
                this.distributionAnalysisBarChart.series[0].data.push(payed.Hotel)
                this.distributionAnalysisBarChart.series[0].data.push(payed.Privat)

                this.distributionAnalysisBarChart.series[1].data.push(total.gesamt - payed.gesamt)
                this.distributionAnalysisBarChart.series[1].data.push(total.Hotel - payed.Hotel)
                this.distributionAnalysisBarChart.series[1].data.push(total.Privat - payed.Privat)
            },

            getLastYearNumbers() {

                let self = this
                this.$moment.locale('de')

                //get Best/Worst Month + taxes
                let i = 11
                let bestTax = 0
                let worstTax = 10000000000
                let bestMonth, worstMonth, tax
                for (i; i >= 0; i--) {
                    tax = statistics.getTaxInPeriod(self.$moment().subtract(i, 'months').startOf('month'), self.$moment().subtract(i, 'months').endOf('month'))

                    if (tax > bestTax) {
                        bestTax = tax
                        bestMonth = self.$moment().subtract(i, 'months').format('MMMM YY')
                    } else if (tax < worstTax) {
                        worstTax = tax
                        worstMonth = self.$moment().subtract(i, 'months').format('MMMM YY')
                    }
                }

                let averageStay = statistics.getAverageLengthOfStayInPeriod(this.$moment().subtract(1, "years"), this.$moment())
                let visiteTypeData = statistics.getNumberOfFormTypesInPeriod(this.$moment().subtract(1, "years"), this.$moment())

                this.lastYearFams = visiteTypeData.Regulaer
                this.lastYearGroups = visiteTypeData.Gruppe
                this.lastYearAvgStay = averageStay.toFixed(2)
                this.lastYearBestMonth = bestMonth
                this.lastYearBestTax = bestTax
                this.lasYearWorstMonth = worstMonth
                this.lastYearWorstTax = worstTax
            }
        }
    }
</script>