<template>
    <!--
    <v-container>
        <v-card :elevation="15">
            <v-card-title>
                {{customFormatter(form.arrivalDate)}} - {{customFormatter(form.departureDate)}}
                <v-spacer/>
                {{form.businessObject.address.streetAndNumber}}
            </v-card-title>
            <v-card-text>
                <v-layout row justify-center text-xs-center>
                    <v-flex xs12 sm4>
                        {{form.guest.name}} {{form.guest.surname}}
                    </v-flex>
                    <v-flex sm1 md2/>
                    <v-flex xs12 sm4>
                        geboren {{customFormatter(form.guest.dateOfBirth)}}
                    </v-flex>
                </v-layout>
                <v-divider/>
                <v-layout row justify-center text-xs-center>
                    <v-flex xs12 sm4>
                        Passnummer: {{form.guest.passportSerialNumber}}
                    </v-flex>
                    <v-flex sm1 md2/>
                    <v-flex xs12 sm4>
                        Nationalität: {{form.guest.nationality}}
                    </v-flex>
                </v-layout>
                <v-divider/>
                <v-layout row justify-center text-xs-center>
                    <v-flex xs12 sm4>
                        {{form.guest.adress.streetAndNumber}}
                    </v-flex>
                    <v-flex sm1 md2/>
                    <v-flex xs12 sm4>
                        {{form.guest.adress.zipCode}} {{form.guest.adress.city}}
                    </v-flex>
                </v-layout>
                <v-divider/>
                <v-layout v-if="form.registrationFormTyp==='F'" row justify-center text-xs-center>
                </v-layout>
                <v-layout v-else-if="form.registrationFormTyp==='G'" row justify-center text-xs-center>
                </v-layout>
                <v-layout v-else>
                    Something went wrong :(
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>
    -->

    <v-container>
        <v-card elevation="10" color="#e9e9e9">
            <v-card-title>
                {{customFormatter(form.arrivalDate)}} - {{customFormatter(form.departureDate)}}
                <v-spacer/>
                {{form.businessObject.address.streetAndNumber}}
            </v-card-title>
            <v-container grid-list-lg>
                <v-layout row>
                    <v-flex xs12 md8 mb-3>
                        <v-card elevation="4">
                            <v-layout row justify-center text-xs-center pt-3>
                                <v-flex xs12 sm4>
                                    {{form.guest.name}} {{form.guest.surname}}
                                </v-flex>
                                <v-flex sm1 md2/>
                                <v-flex xs12 sm4>
                                    geboren {{customFormatter(form.guest.dateOfBirth)}}
                                </v-flex>
                            </v-layout>
                            <v-divider/>
                            <v-layout row justify-center text-xs-center pb-3>
                                <v-flex xs12 sm4>
                                    Passnummer: {{form.guest.passportSerialNumber}}
                                </v-flex>
                                <v-flex sm1 md2/>
                                <v-flex xs12 sm4>
                                    Nationalität: {{form.guest.nationality}}
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 md4 :class="{'mb-3': $vuetify.breakpoint.smAndDown}">
                        <v-card elevation="4">
                            <v-layout row justify-center text-xs-center pt-3>
                                <v-flex xs12>
                                    {{form.guest.adress.streetAndNumber}}
                                </v-flex>
                                <v-divider/>
                            </v-layout>
                            <v-divider/>
                            <v-layout row justify-center text-xs-center pb-3>
                                <v-flex xs12>
                                    {{form.guest.adress.zipCode}} {{form.guest.adress.city}}
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout v-if="form.registrationFormType==='F'">
                    <v-flex xs12 sm8>
                        <v-card v-if="form.hasOwnProperty('partnerName')" elevation="4">
                            <v-layout row justify-center text-xs-center pt-3>
                                <v-flex xs12>
                                    {{form.partnerName}} {{form.partnerSurname}}
                                </v-flex>
                                <v-flex xs12 sm6>
                                    geboren {{customFormatter(form.guest.dateOfBirth)}}
                                </v-flex>
                                <v-flex xs12 sm6>
                                    Nationalität: {{form.nationality}}
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-card v-if="form.hasOwnProperty('childrenYearOfBirth')" elevation="4">
                            <v-layout row justify-center text-xs-center pt-3>
                                <v-flex xs12>
                                    Anzahl Kinder: {{form.childrenYearOfBirth.length}}
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout v-else-if="form.registrationFormType==='G'">
                </v-layout>
                <v-layout v-else>
                    Oh no
                </v-layout>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>

    import FormData from '../assets/singleSampleRegistrationForm';

    export default {
        name: "singularRegForm",
        components: {},
        data() {
            return {
                form: null,
                title: null,
                hasChildren: null
            }
        },
        methods: {
            customFormatter(date) {
                return this.$moment(date).format('DD.MM.YYYY');
            },
            isFamily() {
                if (this.form.registrationFormTyp === "F") return true;

            }
        },
        beforeMount() {
            this.form = FormData;
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
        margin-top: -12px;
    }
</style>