<template>
    <standard-layout>
        <Title name="Betriebe"/>
        <v-container>
            <v-card>
                <v-card-title>
                    <v-layout row>
                        <v-flex px-4>
                            <v-text-field
                                    v-model="search"
                                    prepend-inner-icon="search"
                                    label="Suche"
                                    hide-details
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <v-data-table
                        :headers="headers"
                        :items="items"
                        :pagination.sync="pagination"
                        :rows-per-page-items="['']"
                        :search="search"
                >
                    <template v-slot:items="props">
                        <tr @click="displaySingleBusiness(props.item)">
                            <td><v-layout justify-center>{{ props.item.businessId}}</v-layout></td>
                            <td><v-layout justify-center>{{ props.item.contactPersonSurname}}</v-layout></td>
                            <td><v-layout justify-center>{{ props.item.contactPersonName}}</v-layout></td>
                            <td><v-layout justify-center>{{ props.item.address.streetAndNumber}}</v-layout></td>
                            <td><v-layout justify-center>{{ props.item.businessObjects.length}}</v-layout></td>
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
    import businessData from '../assets/businessData';
    import StandardLayout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    export default {
        name: "BusinessList",
        components: {Title, StandardLayout},
        data(){
            return{
                pagination:{rowsPerPage:8},
                search: '',
                items: null,
                headers:[
                    {
                        text: 'Betr.-Nr.',
                        value: 'businessId',
                        align:'center'
                    },
                    {
                        text: 'Name',
                        value: 'contactPersonSurname',
                        align:'center'
                    },
                    {
                        text: 'Vorname',
                        value: 'contactPersonName',
                        align:'center'
                    },
                    {
                        text: 'Adresse',
                        value: 'address',
                        align:'center'
                    },
                    {
                        text: 'Anzahl Mietobjekte',
                        value: 'businessObjects',
                        align:'center'
                    }
                ]
            }
        },
        beforeMount() {
            this.items = businessData
        },

        methods: {
            displaySingleBusiness(itemProp) {
                this.$router.push({name: 'Betrieb', params: {propsbusiness: itemProp}})
            }
        }
    }
</script>

<style scoped>

</style>