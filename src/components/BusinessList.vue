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
                        <tr @click="displaySingleRegistrationForm(props.item)">
                            <td>{{ props.item.user.username}}</td>
                            <td>{{ props.item.contactPersonSurname}}</td>
                            <td>{{ props.item.contactPersonName}}</td>
                            <td>{{ props.item.adress.streetAndNumber}}</td>
                            <td>{{ props.item.businessObjects.length}}</td>
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
                        value: 'user.username'
                    },
                    {
                        text: 'Name',
                        value: 'contactPersonSurname'
                    },
                    {
                        text: 'Vorname',
                        value: 'contactPersonName'
                    },
                    {
                        text: 'Adresse',
                        value: 'adress'
                    },
                    {
                        text: 'Anzahl Mietobjekte',
                        value: 'businessObjects'
                    }
                ]
            }
        },
        beforeMount() {
            this.items = businessData
        },
    }
</script>

<style scoped>

</style>