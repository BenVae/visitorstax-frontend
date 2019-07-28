<template>
    <standard-layout>
        <Title name="Statistiken erstellen"/>
        <v-container>
            <v-layout row justify-center>
                <v-flex xs2>
                    <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    label="Jahr"
                                    prepend-inner-icon="event"
                                    v-on="on"
                                    clearable
                                    v-model="date"
                                    @click:clear="deleteDate"
                                    :rules="[rules.datum]"
                            ></v-text-field>
                        </template>
                    </v-menu>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex>
                    <v-data-table
                            :headers="headers"
                            :items="items"
                            class="elevation-1"
                            hide-actions
                    >
                        <template v-slot:items="props">
                            <tr>
                                <td>{{props.item.type}}</td>
                                <td>{{ props.item.persons}}</td>
                                <td>{{ props.item.freeOfCharge}}</td>
                                <td>{{ props.item.nights}}</td>
                            </tr>
                        </template>
                    </v-data-table>
                    <v-btn @click="computeItems"></v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </standard-layout>
</template>

<script>
    import StandardLayout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    import {computeStatistics} from "../computeStatistics"
    export default {
        name: "CityStatistics",
        components: {Title, StandardLayout},
        data() {
            return {
                date: null,
                menu1: false,
                headers: [
                    {
                      text: '',
                      sortable: false
                    },
                    {
                        text: 'Personen',
                        value: 'persons',
                        sortable: false
                    },
                    {
                        text: 'Befreit',
                        value: 'freeOfCharge',
                        sortable: false
                    },
                    {
                        text: 'Nächte',
                        value: 'nights',
                        sortable: false
                    }
                ],
                items:[
                    {
                        type:"Konstanz (privat)",
                        persons:0,
                        freeOfCharge:0,
                        nights:0
                    },
                    {
                        type:"Konstanz (Hotel)",
                        persons:0,
                        freeOfCharge:0,
                        nights:0
                    }
                ],
                rules:{
                    datum: value => {
                        if(value === this.$moment(value, 'YYYY').format('YYYY') || value === null){
                            return true
                        }else{
                            return 'Das Datum ist leider inkorrekt'
                        }
                    }
                }
            }
        },
        methods:{
            deleteDate(){
                this.date = null;
            },
            computeItems(){
                var scheine = this.$store.getters.registrationForms;
                var self = this;

                scheine.forEach(function(element){
                   if(self.$moment(element.formData.arrivalDate).format('YYYY') === self.$moment(self.date, 'YYYY').format('YYYY')
                       && self.$moment(element.formData.departureDate).format('YYYY') === self.$moment(self.date, 'YYYY').format('YYYY')){

                       var computedItem = (computeStatistics(element));

                       self.items[0].persons += computedItem.persons;
                       self.items[0].freeOfCharge += computedItem.freeOfCharge;
                       self.items[0].nights += computedItem.nights;

                   }else if(self.$moment(Date.parse(element.formData.arrivalDate)).format('YYYY') === self.$moment(self.date, 'YYYY').format('YYYY')
                       && self.$moment(Date.parse(element.formData.departureDate)).format('YYYY') > self.$moment(self.date, 'YYYY').format('YYYY')){

                       element.formData.departureDate = parseInt(self.$moment(Date.parse(element.formData.departureDate)).format('YYYY'))-1 + '-12-31';

                       var computedItemComplexDeparture = (computeStatistics(element));

                       self.items[0].persons += computedItemComplexDeparture.persons;
                       self.items[0].freeOfCharge += computedItemComplexDeparture.freeOfCharge;
                       self.items[0].nights += computedItemComplexDeparture.nights;

                   }else if(self.$moment(Date.parse(element.formData.arrivalDate)).format('YYYY') < self.$moment(self.date, 'YYYY').format('YYYY')
                       && self.$moment(Date.parse(element.formData.departureDate)).format('YYYY') === self.$moment(self.date, 'YYYY').format('YYYY')){

                       element.formData.arrivalDate = parseInt(self.$moment(Date.parse(element.formData.arrivalDate)).format('YYYY'))+1 + '-01-01';

                       var computedItemComplexArrival = (computeStatistics(element));

                       self.items[0].persons += computedItemComplexArrival.persons;
                       self.items[0].freeOfCharge += computedItemComplexArrival.freeOfCharge;
                       self.items[0].nights += computedItemComplexArrival.nights;

                   }
                });

            },
        },
    }
</script>

<style scoped>

</style>