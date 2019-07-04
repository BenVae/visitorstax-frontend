<template>
    <b-container>
        <div class="complete-form mt-5">
            <!--
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
            -->

            <div class="card">
                <div class="card-header">
                    {{moment(form.arrivalDate).locale('de').calendar()}} -
                    {{moment(form.departureDate).locale('de').calendar()}}
                    <span class="float-right mr-5">{{form.businessObject.address.streetAndNumber}}</span>
                </div>
                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item justify-content-around">
                            <small class="sectionTitle">Gast</small>
                            <div class="row justify-content-center text-center">
                                <div class="col-md-4 col-xs-12">{{form.guest.name}} {{form.guest.surname}}</div>
                                <div class="col-md-2"></div>
                                <div class="col-md-4 col-xs-12">geboren
                                    {{moment(form.guest.dateOfBirth).locale('de').calendar()}}
                                </div>
                            </div>
                            <hr class="px-5">
                            <div class="row justify-content-center text-center">
                                <div class="col-md-4 col-xs-12">Passnummer: {{form.guest.passportSerialNumber}}</div>
                                <div class="col-md-2"></div>
                                <div class="col-md-4 col-xs-12">Nationalität: {{form.guest.nationality}}</div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <small class="sectionTitle">Adresse</small>
                            <div class="row justify-content-center text-center">
                                <div class="col-md-4 col-xs-12">{{form.guest.adress.streetAndNumber}}</div>
                                <div class="col-md-2"></div>
                                <div class="col-md-4 col-xs-12">{{form.guest.adress.zipCode}} {{form.guest.adress.city}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </b-container>
</template>

<script>

    import FormData from '../assets/sampleRegistrationForm';
    import RowWithDescription from "./utils/RowWithDescription";


    export default {
        name: "singularRegForm",
        components: {RowWithDescription},
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

    .sectionTitle {
        margin-left: -20px;
        color: gray;
    }
</style>