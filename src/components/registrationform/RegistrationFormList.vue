<template>
    <standard-layout>
        <Title name="Meldescheine"/>
        <v-container>
            <v-card>
                <v-card-title>
                    <v-layout row>
                        <v-flex xs12 md4 px-4>
                            <v-text-field
                                    v-model="search"
                                    prepend-inner-icon="search"
                                    label="Suche"
                                    hide-details
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md4 px-4>
                            <v-menu
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            label="Ankunft"
                                            prepend-inner-icon="event"
                                            readonly
                                            v-on="on"
                                            clearable
                                            v-model="computeArrivalDateFormat"
                                            @click:clear="deleteArrival"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                        v-model="arrivalDate"
                                        @input="menu1 = false"
                                        color="red lighten-1"
                                ></v-date-picker>
                            </v-menu>
                        </v-flex>
                        <v-flex xs12 md4 px-4 pr-4>
                            <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            label="Abfahrt"
                                            prepend-inner-icon="event"
                                            readonly
                                            v-on="on"
                                            clearable
                                            v-model="computeDepartureDateFormat"
                                            @click:clear="deleteDeparture()"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="departureDate"
                                               form
                                               @input="menu2 = false"
                                               color="red lighten-1"
                                ></v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <v-data-table
                        :headers="headers"
                        :items="compileSearch"
                        :pagination.sync="pagination"
                        :rows-per-page-items="['']"
                        :search="search"
                >
                    <template v-slot:items="props">
                        <tr @click="displaySingleRegistrationForm(props.item)">
                            <td>
                                <v-layout justify-center>{{ props.item.meta.registrationNumber }}</v-layout>
                            </td>
                            <td>
                                <v-layout justify-center>{{ props.item.formData.guest.surname }}</v-layout>
                            </td>
                            <td>
                                <v-layout justify-center>{{ props.item.formData.guest.name }}</v-layout>
                            </td>
                            <td>
                                <v-layout justify-center>{{
                                    $moment(props.item.formData.arrivalDate).format('DD.MM.YYYY') }}
                                </v-layout>
                            </td>
                            <td>
                                <v-layout justify-center>{{
                                    $moment(props.item.formData.departureDate).format('DD.MM.YYYY') }}
                                </v-layout>
                            </td>
                            <td>
                                <v-layout justify-center>{{ props.item.formData.registrationFormType}}</v-layout>
                            </td>
                            <td>
                                <v-layout justify-center>{{mapStatus(props.item.meta.state)}}</v-layout>
                            </td>
                            <td>
                                <v-layout justify-center>{{ props.item.meta.tax }}</v-layout>
                            </td>
                        </tr>
                    </template>
                    <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                            Die Suche "{{ search }}" war leider Ergebnislos.
                        </v-alert>
                    </template>
                </v-data-table>
            </v-card>
        </v-container>
    </standard-layout>
</template>


<script>
    import StandardLayout from "../utils/StandardLayout";
    import Title from "../utils/Title";
    import {getBusinessIdOfLoggedInUser} from "../../script/loginService";

    export default {
        name: "RegistrationFormList",
        components: {Title, StandardLayout},
        data() {
            return {
                pagination: {rowsPerPage: 8},
                types: null,
                search: '',
                arrivalDate: null,
                departureDate: null,
                menu1: false,
                menu2: false,
                headers: [
                    {
                        text: 'Ms-Nr.',
                        value: 'meta.registrationNumber',
                        align: 'center'
                    },
                    {
                        text: 'Name',
                        value: 'formData.guest.surname',
                        align: 'center'
                    },
                    {
                        text: 'Vorname',
                        value: 'formData.guest.name',
                        align: 'center'
                    },
                    {
                        text: 'Ankunft',
                        value: 'formData.arrivalDate',
                        align: 'center'
                    },
                    {
                        text: 'Abfahrt',
                        value: 'formData.departureDate',
                        align: 'center'
                    },
                    {
                        text: 'Typ',
                        value: 'formData.registrationFormType',
                        align: 'center'
                    }, {
                        text: 'Status',
                        value: 'meta.status',
                        align: 'center'
                    },
                    {
                        text: 'Kurtaxe in €',
                        value: 'meta.tax',
                        align: 'center'
                    }
                ]
            }
        },
        beforeMount() {
            this.items = this.$store.getters.registrationForms;

            let businessid = getBusinessIdOfLoggedInUser();

            if (this.$store.getters.role === 'city') {
                this.items = this.items.filter(item => item.meta.state === "submitted")
            }else{
                this.items = this.items.filter(element => parseInt(element.meta.businessObject.business.id) === parseInt(businessid));
            }
        },
        computed: {
            computeArrivalDateFormat: {
                get: function () {
                    if (this.arrivalDate == null) return null;
                    return this.$moment(this.arrivalDate).format('DD.MM.YYYY')
                },
                set: function () {
                }
            },
            computeDepartureDateFormat: {
                get: function () {
                    if (this.departureDate == null) return null;
                    return this.$moment(this.departureDate).format('DD.MM.YYYY')
                },
                set: function () {
                }
            },
            compileSearch() {
                if (this.arrivalDate == null && this.departureDate == null) {
                    return this.items
                } else if (this.arrivalDate != null && this.departureDate == null) {
                    console.log(this.items)
                    return this.items.filter(item =>
                        Date.parse(item.formData.arrivalDate) >= Date.parse(this.arrivalDate)
                    )
                } else if (this.arrivalDate == null && this.departureDate != null) {
                    console.log(this.items)
                    return this.items.filter(item =>
                        Date.parse(item.formData.departureDate) <= Date.parse(this.departureDate)
                    )
                } else {
                    console.log(this.items)
                    return this.items.filter(item =>
                        Date.parse(item.formData.arrivalDate) >= Date.parse(this.arrivalDate) && Date.parse(item.formData.departureDate) <= Date.parse(this.departureDate)
                    )
                }
            },
        },
        methods: {
            deleteDeparture() {
                this.departureDate = null
            },
            deleteArrival() {
                this.arrivalDate = null
            },
            displaySingleRegistrationForm(itemProp) {
                this.$router.push({name: 'Meldeschein', params: {propform: itemProp}})
            },
            mapStatus(status) {
                let stat;

                switch (status) {
                    case "submitted":
                        stat = "Abgeschickt";
                        break;
                    case "unsubmitted":
                        stat = "Offen";
                        break;
                        case "incoiceSent":
                        stat = "Rechnung verschickt";
                        break;
                        case "incoicePayed":
                        stat = "Rechnung bezahlt";
                        break;
                }

                return stat;
            }
        }
    }
</script>

<style scoped>
</style>