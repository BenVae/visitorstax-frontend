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
                                    @click:clear="computeItems"
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
                    >
                    </v-data-table>
                </v-flex>
            </v-layout>
        </v-container>
    </standard-layout>
</template>

<script>
    import StandardLayout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    export default {
        name: "CityStatistics",
        components: {Title, StandardLayout},
        data() {
            return {
                date: null,
                menu1: false,
                headers:[
                    {
                        text:'Personen'
                    },
                    {
                        text:'Befreite'
                    },
                    {
                        text:'Sonstige'
                    },
                    {
                        text:'Anzahl Nächte'
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
                scheine.forEach(function(element){
                   if(this.$moment(Date.parse(element.formData.arrivalDate)).format('YYYY') === this.$moment(this.date, 'YYYY').format('YYYY')
                       && this.$moment(Date.parse(element.formData.departureDate)).format('YYYY') === this.$moment(this.date, 'YYYY').format('YYYY')){

                   }else if(this.$moment(Date.parse(element.formData.arrivalDate)).format('YYYY') === this.$moment(this.date, 'YYYY').format('YYYY')
                       && this.$moment(Date.parse(element.formData.departureDate)).format('YYYY') > this.$moment(this.date, 'YYYY').format('YYYY')){

                   }else if(this.$moment(Date.parse(element.formData.arrivalDate)).format('YYYY') < this.$moment(this.date, 'YYYY').format('YYYY')
                       && this.$moment(Date.parse(element.formData.departureDate)).format('YYYY') === this.$moment(this.date, 'YYYY').format('YYYY')){

                   }
                });

               // this.items = this.items.filter(item => this.$moment(Date.parse(item.formData.arrivalDate)).format('YYYY') === this.$moment(this.date, 'YYYY').format('YYYY')
                //    && this.$moment(Date.parse(item.formData.departureDate)).format('YYYY') === this.$moment(this.date, 'YYYY').format('YYYY'));

                //this.items = this.items.filter(item => this.$moment(Date.parse(item.formData.arrivalDate)).format('YYYY') === this.$moment(this.date, 'YYYY').format('YYYY')
                //    && this.$moment(Date.parse(item.formData.departureDate)).format('YYYY') > this.$moment(this.date, 'YYYY').format('YYYY'));
            }
        },
    }
</script>

<style scoped>

</style>