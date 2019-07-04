<template>
    <standard-layout>
        <Title name="Meldescheine"/>
        <v-container>
        <v-card>
            <v-card-title>
                <v-layout row >
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
                    :items="items"
                    :search="search"
                    :pagination.sync="pagination"
                    :rows-per-page-items="[]"
            >
                <template v-slot:items="props">
                    <td>{{ props.item.registrationNumber }}</td>
                    <td>{{ props.item.guest.surname }}</td>
                    <td>{{ props.item.guest.name }}</td>
                    <td>{{ $moment(props.item.arrivalDate).format('DD.MM.YYYY') }}</td>
                    <td>{{ $moment(props.item.departureDate).format('DD.MM.YYYY') }}</td>
                    <td>{{ props.item.registrationFormTyp }}</td>
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
    import FormData from '../assets/sampleRegistrationForm';
    import StandardLayout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    export default {
        name: "RegistrationFormList",
        components: {Title, StandardLayout},
        data() {
            return {
                pagination:{rowsPerPage:8},
                items: null,
                search: '',
                arrivalDate: null,
                departureDate: null,
                menu1:false,
                menu2: false,
                headers:[
                    {
                        text: 'Ms-Nr.',
                        value: 'registrationNumber'
                    },
                    {
                        text: 'Name',
                        value: 'guest.surname'
                    },
                    {
                        text: 'Vorname',
                        value: 'guest.name'
                    },
                    {
                        text: 'Ankunft',
                        value: 'arrivalDate'
                    },
                    {
                        text: 'Abfahrt',
                        value: 'departureDate'
                    },
                    {
                        text: 'Typ',
                        value: 'registrationFormTyp'
                    }
                ]
            }
        },
        beforeMount() {
            this.items = FormData
        },
        computed:{
            computeArrivalDateFormat () {
                if(this.arrivalDate == null) return null
                return this.$moment(new Date().toISOString().substr(0, 10)).format('DD.MM.YYYY')
            },
            computeDepartureDateFormat () {
                if(this.departureDate == null) return null
                return this.$moment(new Date().toISOString().substr(0, 10)).format('DD.MM.YYYY')
            }
        }
    }
</script>

<style scoped>

</style>