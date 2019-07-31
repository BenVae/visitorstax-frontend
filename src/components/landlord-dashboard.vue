<template>
    <Layout>
        <Title name="Startseite"/>
        <v-container grid-list-lg>
            <v-layout row>
                <v-flex xs12>
                    <v-card>
                        <v-card-title>
                            <span class="title mx-auto">Offene Scheine</span>
                        </v-card-title>
                        <v-data-table
                                :headers="unsubmitted.headers"
                                :items="unsubmitted.items"
                                :pagination.sync="unsubmitted.pagination"
                                :rows-per-page-items="['']"
                        >
                            <template v-slot:items="items">
                                <tr @click="displaySingleRegistrationForm(items.item)">
                                    <td>{{ items.item.meta.registrationNumber }}</td>
                                    <td>{{ items.item.formData.guest.surname }}</td>
                                    <td>{{ items.item.formData.guest.name }}</td>
                                    <td>{{ $moment(items.item.formData.arrivalDate).format('DD.MM.YYYY') }}</td>
                                    <td>{{ $moment(items.item.formData.departureDate).format('DD.MM.YYYY') }}
                                    </td>
                                    <td>{{ items.item.formData.registrationFormType}}</td>
                                    <td>{{ items.item.meta.tax }}</td>
                                </tr>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-card>
                <v-card-title>
                    <span class="title mx-auto">Im letzten Jahr...</span>
                </v-card-title>
            <v-layout row>
                <v-flex xs12 md6>
                        <apexchart type="line"
                                   :options="overTimeLineChart.options"
                                   :series="overTimeLineChart.series"></apexchart>
                </v-flex>
                <v-flex xs12 md6>
                        <v-container fill-height>
                            <v-layout row text-center class="px-5">
                                <v-flex>
                                    <div class="font-weight-thin title grey--text">Gäste: </div>
                                    <div class="font-weight-light headline mt-2">{{lastYearGuests}}</div>
                                </v-flex>
                                <v-flex>
                                    <div class="font-weight-thin title grey--text">Familien: </div>
                                    <div class="font-weight-light headline mt-2">{{lastYearFams}}</div>
                                </v-flex>
                                <v-flex>
                                    <div class="font-weight-thin title grey--text">Gruppen: </div>
                                    <div class="font-weight-light headline mt-2">{{lastYearGroups}}</div>
                                </v-flex>
                                <v-flex>
                                    <div class="font-weight-thin title grey--text">Bester Monat: </div>
                                    <div class="font-weight-light headline mt-2">{{lastYearBestMonth}} / {{lastYearBestTax}}€</div>
                                </v-flex>
                                <v-flex>
                                    <div class="font-weight-thin title grey--text">Schlechtester Monat: </div>
                                    <div class="font-weight-light headline mt-2">{{lastYearWorstMonth}} / {{lastYearWorstTax}}€</div>
                                </v-flex>
                            </v-layout>
                        </v-container>
                </v-flex>
            </v-layout>
            </v-card>
        </v-container>
    </Layout>
</template>

<script>
    import Layout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    import * as statistics from "../script/dashboardService";
    import apexchart from 'vue-apexcharts';

    export default {
        name: "landlordStart",
        components: {Layout, Title, apexchart},

        data() {
            return {
                unsubmitted: {
                    items: null,
                    pagination: {rowsPerPage: 2},
                    headers: [
                        {
                            text: 'Ms-Nr.',
                            value: 'meta.registrationNumber'
                        },
                        {
                            text: 'Name',
                            value: 'formData.guest.surname'
                        },
                        {
                            text: 'Vorname',
                            value: 'formData.guest.name'
                        },
                        {
                            text: 'Ankunft',
                            value: 'formData.arrivalDate'
                        },
                        {
                            text: 'Abfahrt',
                            value: 'formData.departureDate'
                        },
                        {
                            text: 'Typ',
                            value: 'formData.registrationFormType'
                        },
                        {
                            text: 'Kurtaxe in €',
                            value: 'meta.tax'
                        }
                    ]
                },
                overTimeLineChart: {
                    options: {
                        xaxis: {
                            categories: []
                        },
                        yaxis: [
                            {
                                seriesName: "Gäste",
                                labels: {
                                    formatter: function (val) {
                                        return Math.trunc(val)
                                    }
                                }
                            },
                            {
                                seriesName: "Kurtax",
                                opposite: true,
                                labels: {
                                    formatter: function (val) {
                                        return val + "€"
                                    }
                                }
                            }
                        ]
                    },
                    series: [
                        {name: "Gäste", data: []},
                        {name: "Kurtaxe", data: []}
                    ]
                },
                lastYearBestMonth: null,
                lastYearBestTax: null,
                lastYearWorstMonth: null,
                lastYearWorstTax: null,
                lastYearFams: null,
                lastYearGroups: null,
                lastYearGuests: null
            }
        },

        beforeMount() {
            statistics.makeDict()

            this.unsubmitted.items = this.getUnsubmittedForms();
            this.makeLineChart();
            this.getLastYearData()
        },

        methods: {
            getUnsubmittedForms() {
                var items = this.$store.getters.registrationForms.filter(form => form.meta.state === "unsubmitted");
                return items;
            },

            getSubmittedForms() {
                var items = this.$store.getters.registrationForms.filter(form => form.meta.state === "submitted");
                return items;
            },

            makeLineChart() {
                let self = this
                let i = 11

                let distribution, tax

                for (i; i >= 0; i--) {
                    distribution = statistics.getGuestsInPeriod(self.$moment().subtract(i, 'months').startOf('month'), self.$moment().subtract(i, 'months').endOf('month'))
                    tax = statistics.getTaxInPeriod(self.$moment().subtract(i, 'months').startOf('month'), self.$moment().subtract(i, 'months').endOf('month'))

                    self.overTimeLineChart.series[0].data.push(distribution)
                    self.overTimeLineChart.series[1].data.push(tax)
                    self.overTimeLineChart.options.xaxis.categories.push(self.$moment().subtract(i, 'months').format('MMM YY'))

                }
            },

            displaySingleRegistrationForm(itemProp) {
                this.$router.push({name: 'Meldeschein', params: {propform: itemProp}})
            },

            getLastYearData() {
                let self = this

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

                let visiteTypeData = statistics.getNumberOfFormTypesInPeriod(this.$moment().subtract(1, "years"), this.$moment())

                this.lastYearGuests = statistics.getGuestsInPeriod(this.$moment().subtract(1, "years"), this.$moment())
                this.lastYearFams = visiteTypeData.Regulaer
                this.lastYearGroups = visiteTypeData.Gruppe
                this.lastYearBestMonth = bestMonth
                this.lastYearBestTax = bestTax.toFixed(2)
                this.lastYearWorstMonth = worstMonth
                this.lastYearWorstTax = worstTax.toFixed(2)
            }
        }
    }
</script>

<style scoped>

</style>