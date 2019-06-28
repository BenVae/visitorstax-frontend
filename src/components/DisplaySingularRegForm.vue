<template>

    <Layout>
        <b-container>
            <Title :name="title"></Title>
            <div class="complete-form mt-5">
                <b-row class="justify-content-center text-center top-buffer mb-3">
                    <b-col cols="4" id="ankunft">
                        {{moment(form.arrivalDate).locale('de').calendar()}} bis
                        {{moment(form.departureDate).locale('de').calendar()}}
                    </b-col>
                    <b-col cols="1"/>
                    <b-col cols="4">Objekt: {{form.businessObject.address.streetAndNumber}}</b-col>
                </b-row>
                <RowWithDescription name="Gast"/>
                <b-row class="justify-content-center text-center top-buffer">
                    <b-col cols="4">
                        Vorname: {{form.guest.name}}
                    </b-col>
                    <b-col cols="1"/>
                    <b-col cols="4">
                        Familienname: {{form.guest.surname}}
                    </b-col>
                </b-row>
                <RowWithDescription name="Adresse"/>
                <template v-if=""
            </div>
        </b-container>
    </Layout>
</template>

<script>

    import FormData from '../assets/sampleRegistrationForm';
    import Layout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    import RowWithDescription from "./utils/RowWithDescription";


    export default {
        name: "singularRegForm",
        components: {RowWithDescription, Title, Layout},
        data() {
            return {
                form: null,
                title: null,
                hasChildren: null
            }
        },
        mounted() {
            this.form = FormData,
                this.title = "Meldeschein #" + this.form.registrationNumber;

        },
    }
</script>

<style lang="scss" scoped>

    .complete-form {
        font-size: 1.1rem;
    }

    .top-buffer {
        margin-top: 10px;
    }

</style>