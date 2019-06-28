<template>
    <standard-layout>
        <b-container fluid>
            <Title name="Meldescheine"/>
            <b-row class="mt-3">
                <b-col md="4" class="my-1">
                    <b-form-group label="Filter:" class="mb-0">
                        <b-input-group>
                            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                    <b-form-group label="Ankunft:" class="mb-0">
                        <b-input-group>
                            <input type="date" v-model="ankunftFilter"/>
                        </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                    <b-form-group label="Abreise:" class="mb-0">
                        <b-input-group>
                            <input type="date" v-model="abfahrtFilter"/>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-table striped hover bordered :filter="filter" :fields="fields" :items="form"/>
        </b-container>
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
                form: null,
                fields:[{key:'registrationNumber',label:'Ms-Nr.', sortable:true},{key:'guest.surname', label:'Nachname'},{key:'guest.name',label:'Vorname'},
                    {key:'arrivalDate',label:'Ankunft'},{key:'departureDate',label:'Abreise'},{key:'registrationFormTyp',label:'Typ'}],
                filter:null,
                abfahrtFilter:null,
                ankunftFilter:null
            }
        },
        mounted() {
            this.form = FormData
        },
    }
</script>

<style scoped>

</style>