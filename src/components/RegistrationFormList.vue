<template>
    <standard-layout>
        <b-container>
            <Title name="Meldescheine"/>
            <b-table striped hover bordered :fields="fields" :items="form"/>
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
                    {key:'arrivalDate',label:'Ankunft'},{key:'departureDate',label:'Abreise'},{key:'registrationFormTyp',label:'Typ'}]
            }
        },
        mounted() {
            this.form = FormData
        },
    }
</script>

<style scoped>

</style>