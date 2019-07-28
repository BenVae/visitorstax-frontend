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
    import {computeStatistics} from "../computeStatistics";
    import businessData from "../assets/businessData";
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

                       self.computePrivateOrHotel(computeStatistics(element), element);

                   }else if(self.$moment(Date.parse(element.formData.arrivalDate)).format('YYYY') === self.$moment(self.date, 'YYYY').format('YYYY')
                       && self.$moment(Date.parse(element.formData.departureDate)).format('YYYY') > self.$moment(self.date, 'YYYY').format('YYYY')){

                       element.formData.departureDate = parseInt(self.$moment(Date.parse(element.formData.departureDate)).format('YYYY'))-1 + '-12-31';

                       self.computePrivateOrHotel(computeStatistics(element), element);

                   }else if(self.$moment(Date.parse(element.formData.arrivalDate)).format('YYYY') < self.$moment(self.date, 'YYYY').format('YYYY')
                       && self.$moment(Date.parse(element.formData.departureDate)).format('YYYY') === self.$moment(self.date, 'YYYY').format('YYYY')){

                       element.formData.arrivalDate = parseInt(self.$moment(Date.parse(element.formData.arrivalDate)).format('YYYY'))+1 + '-01-01';

                       self.computePrivateOrHotel(computeStatistics(element), element);
                   }
                });

            },
            computePrivateOrHotel(formItem, element){
                var dict = {};
                businessData.forEach(function(element){
                    dict[element.businessId] = element.type;
                });

                if(dict[element.meta.businessObject.business.id] === "Privat"){
                    this.items[0].persons += formItem.persons;
                    this.items[0].freeOfCharge += formItem.freeOfCharge;
                    this.items[0].nights += formItem.nights;
                }else{
                    this.items[1].persons += formItem.persons;
                    this.items[1].freeOfCharge += formItem.freeOfCharge;
                    this.items[1].nights += formItem.nights;
                }
            }
        },
    }
</script>

<style scoped>

</style>