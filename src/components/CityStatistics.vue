<template>
    <standard-layout>
        <Title name="Statistiken erstellen"/>
        <v-container>
            <v-layout row justify-center id="textRow">
                <v-flex xs4>
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
                                    v-model="computeItems2"
                                    @click:clear="deleteDate"
                                    :rules="[rules.datum]"
                            ></v-text-field>
                        </template>
                    </v-menu>
                </v-flex>
            </v-layout>
            <v-layout row mt-3>
                <v-flex>
                    <v-data-table
                            :headers="headers"
                            :items="items"
                            class="elevation-1"
                            hide-actions
                    >
                        <template v-slot:items="props">
                            <tr v-if="props.item.type === 'Gesamt'">
                                <td class="font-weight-bold">{{props.item.type}}</td>
                                <td class="font-weight-bold">{{props.item.persons}}</td>
                                <td class="font-weight-bold">{{props.item.freeOfCharge}}</td>
                                <td class="font-weight-bold">{{props.item.nights}}</td>
                            </tr>
                            <tr v-else>
                                <td>{{props.item.type}}</td>
                                <td>{{props.item.persons}}</td>
                                <td>{{props.item.freeOfCharge}}</td>
                                <td>{{props.item.nights}}</td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>

        </v-container>
        <v-layout v-if="this.date != null" align-center justify-center>
            <v-btn
                    @click="generatePDF"
                    color="blue-grey"
                    dark>Statstik herunterladen
            </v-btn>
        </v-layout>
    </standard-layout>
</template>

<script>
    import StandardLayout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    import {statisticsService} from "../script/statisticsService";
    import businessData from "../assets/businessData";
    export default {
        name: "CityStatistics",
        components: {Title, StandardLayout},
        data() {
            return {
                menu1: false,
                date: null,
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
                    },
                    {
                        type:"Gesamt",
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
                            return 'Bitte geben Sie das Jahr im korrekten Format z.B. 2019 an.'
                        }
                    }
                }
            }
        },
        methods:{
            deleteDate(){
                this.date=null;
                this.clearItems();
            },
            clearItems(){
                this.items[0].persons = 0;
                this.items[0].freeOfCharge = 0;
                this.items[0].nights = 0;
                this.items[1].persons = 0;
                this.items[1].freeOfCharge = 0;
                this.items[1].nights = 0;
                this.items[2].persons = 0;
                this.items[2].freeOfCharge = 0;
                this.items[2].nights = 0;
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

                this.items[2].persons += formItem.persons;
                this.items[2].freeOfCharge += formItem.freeOfCharge;
                this.items[2].nights += formItem.nights;
            },
            downloadPDF(){
                let pdfMake = require('pdfmake/build/pdfmake.js');
                let pdfFonts = require('pdfmake/build/vfs_fonts.js');
                let pdfName = "Statistiken-" + this.date;
                pdfMake.vfs = pdfFonts.pdfMake.vfs;

                pdfMake.createPdf(this.getDocumentDefinition()).download(pdfName);
            },
            getDocumentDefinition(){

               var docDefinition = {
                    content: [
                        {text: 'Übernachtungen '+this.date, fontSize: 25, bold:true,
                            margin: [ 0, 0, 0, 20],
                            alignment: 'center'
                        },
                        {   layout: 'lightHorizontalLines',
                            table: {
                                heights: [10, 20, 20, 20],
                                widths: ['*','*','*','*'],
                                body: [
                                    [{text:''},
                                        {text:'Personen', style:'tableHeader', alignment:'center'},
                                        {text:'Befreite', style:'tableHeader', alignment:'center'},
                                        {text:'Nächte', style:'tableHeader', alignment:'center'}],

                                    [{text:'Konstanz (privat)', alignment:'left'},
                                        {text: this.items[0].persons, alignment:'center'},
                                        {text: this.items[0].freeOfCharge, alignment:'center'},
                                        {text: this.items[0].nights, alignment:'center'}],

                                    [{text:'Konstanz (Hotel)', alignment:'left'},
                                        {text: this.items[1].persons, alignment:'center'},
                                        {text: this.items[1].freeOfCharge, alignment:'center'},
                                        {text: this.items[1].nights, alignment:'center'}],

                                    [{text:'Gesamt', alignment:'left', bold:true},
                                        {text: this.items[2].persons, alignment:'center', bold:true},
                                        {text: this.items[2].freeOfCharge, alignment:'center', bold:true},
                                        {text: this.items[2].nights, alignment:'center', bold:true}],

                                ]
                            }
                        },
                    ],
                    styles:{
                        bottomRow:{
                            alignment:'center',
                            bold:true
                        }
                    }
                };

               return docDefinition;
            }
        },
        computed:{
            computeItems2:{
                set: function (date) {
                    if (this.$moment(date, 'YYYY', true).isValid()) {
                        this.date = date;
                        var scheine = this.$store.getters.registrationForms;
                        var self = this;

                        this.clearItems();

                        scheine.forEach(function (element) {
                            if (self.$moment(element.formData.arrivalDate).format('YYYY') === self.$moment(date, 'YYYY').format('YYYY')
                                && self.$moment(element.formData.departureDate).format('YYYY') === self.$moment(date, 'YYYY').format('YYYY')) {

                                self.computePrivateOrHotel(statisticsService(element), element);

                            } else if (self.$moment(Date.parse(element.formData.arrivalDate)).format('YYYY') === self.$moment(date, 'YYYY').format('YYYY')
                                && self.$moment(Date.parse(element.formData.departureDate)).format('YYYY') > self.$moment(date, 'YYYY').format('YYYY')) {

                                element.formData.departureDate = parseInt(self.$moment(Date.parse(element.formData.departureDate)).format('YYYY')) - 1 + '-12-31';

                                self.computePrivateOrHotel(statisticsService(element), element);

                            } else if (self.$moment(Date.parse(element.formData.arrivalDate)).format('YYYY') < self.$moment(date, 'YYYY').format('YYYY')
                                && self.$moment(Date.parse(element.formData.departureDate)).format('YYYY') === self.$moment(date, 'YYYY').format('YYYY')) {

                                element.formData.arrivalDate = parseInt(self.$moment(Date.parse(element.formData.arrivalDate)).format('YYYY')) + 1 + '-01-01';

                                self.computePrivateOrHotel(statisticsService(element), element);
                            }
                        });
                    }
                },
                get:function () {
                    return '';
                }
            }
        }
    }
</script>

<style scoped>
    #textRow{
        min-height: 70px;
    }
    iframe{
        width: 100%;
    }
</style>