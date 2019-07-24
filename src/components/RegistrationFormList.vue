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
                    <td>{{ props.item.meta.registrationNumber }}</td>
                    <td>{{ props.item.formData.guest.surname }}</td>
                    <td>{{ props.item.formData.guest.name }}</td>
                    <td>{{ $moment(props.item.formData.arrivalDate).format('DD.MM.YYYY') }}</td>
                    <td>{{ $moment(props.item.formData.departureDate).format('DD.MM.YYYY') }}</td>
                    <td>{{ props.item.formData.registrationFormType}}</td>
                    <td>{{ props.item.meta.tax }}</td>
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
    import FormData from '../assets/sampleRegistrationForm';
    import StandardLayout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    export default {
        name: "RegistrationFormList",
        components: {Title, StandardLayout},
        data() {
            return {
                pagination:{rowsPerPage:8},
                types: null,
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
                        value: 'registrationFormType'
                    },
                    {
                        text: 'Kurtaxe in €',
                        value: 'tax'
                    }
                ]
            }
        },
        beforeMount() {
            this.items = FormData
        },
        computed:{
            computeArrivalDateFormat: {
                get: function () {
                    if(this.arrivalDate == null) return null
                    return this.$moment(this.arrivalDate).format('DD.MM.YYYY')
                },
                set: function () {
                }
            },
            computeDepartureDateFormat: {
                get: function () {
                    if(this.departureDate == null) return null
                    return this.$moment(this.departureDate).format('DD.MM.YYYY')
                },
                set: function () {
                }
            },
            compileSearch (){
                if(this.arrivalDate == null && this.departureDate == null){
                    return this.items
                } else if(this.arrivalDate != null && this.departureDate == null) {
                    return this.items.filter(item =>
                        Date.parse(item.formData.arrivalDate) >= Date.parse(this.arrivalDate)
                    )
                } else if(this.arrivalDate == null && this.departureDate != null) {
                    return this.items.filter(item =>
                        Date.parse(item.formData.departureDate) <= Date.parse(this.departureDate)
                    )
                } else{
                    return this.items.filter(item =>
                        Date.parse(item.formData.arrivalDate) >= Date.parse(this.arrivalDate) && Date.parse(item.formData.departureDate) <= Date.parse(this.departureDate)
                    )
                }
            },
        },
        methods:{
            deleteDeparture(){
                this.departureDate = null
            },
            deleteArrival(){
                this.arrivalDate = null
            },
            displaySingleRegistrationForm(itemProp){
                this.$router.push({name: 'Meldeschein', params: {form: itemProp}})
            }
        }
    }
</script>

<style scoped>
</style>