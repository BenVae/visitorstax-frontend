<template>
    <v-container>

        <v-card elevation="10" color="#e9e9e9">
            <v-card-title>
                {{customFormatter(propform.arrivalDate)}} - {{customFormatter(propform.departureDate)}}
                <v-spacer/>
                <template v-if="propform.registrationFormType==='F'">
                    <span class="title">Familie</span>
                    <v-spacer/>
                </template>
                <template v-else-if="propform.registrationFormType==='G'">
                    <span class="title">Gruppe</span>
                    <v-spacer/>
                </template>
                <template v-else>
                    <space class="title">Fehler bei Meldescheinverarbeitung</space>
                    <v-spacer/>
                </template>
                {{propform.businessObject.address.streetAndNumber}}
            </v-card-title>
            <v-container grid-list-lg>
                <v-layout row>
                    <v-flex xs12 md8 mb-3>
                        <v-card elevation="4">
                            <v-icon>person</v-icon>
                            <v-layout row justify-center text-xs-center>
                                <v-flex xs12 sm4>
                                    {{propform.guest.name}} {{propform.guest.surname}}
                                </v-flex>
                                <v-flex sm1 md2/>
                                <v-flex xs12 sm4>
                                    geboren {{customFormatter(propform.guest.dateOfBirth)}}
                                </v-flex>
                            </v-layout>
                            <v-divider/>
                            <v-layout row justify-center text-xs-center pb-3>
                                <v-flex xs12 sm4>
                                    Passnummer: {{propform.guest.passportSerialNumber}}
                                </v-flex>
                                <v-flex sm1 md2/>
                                <v-flex xs12 sm4>
                                    Nationalität: {{propform.guest.nationality}}
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 md4 :class="{'mb-3': $vuetify.breakpoint.smAndDown}">
                        <v-card elevation="4">
                            <v-icon>local_offer</v-icon>
                            <v-layout row justify-center text-xs-center>
                                <v-flex xs12>
                                    {{propform.guest.adress.streetAndNumber}}
                                </v-flex>
                                <v-divider/>
                            </v-layout>
                            <v-divider/>
                            <v-layout row justify-center text-xs-center pb-3>
                                <v-flex xs12>
                                    {{propform.guest.adress.zipCode}} {{propform.guest.adress.city}}
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout v-if="propform.registrationFormType==='F'" row>
                    <v-flex xs12 sm8>
                        <v-card v-if="propform.hasOwnProperty('partnerName')" elevation="4">
                            <v-icon>loyalty</v-icon>
                            <v-layout row justify-center text-xs-center>
                                <v-flex xs12>
                                    {{propform.partnerName}} {{propform.partnerSurname}}
                                </v-flex>
                                <v-flex xs12 sm6>
                                    geboren {{customFormatter(propform.guest.dateOfBirth)}}
                                </v-flex>
                                <v-flex xs12 sm6>
                                    Nationalität: {{propform.nationality}}
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-card v-if="propform.hasOwnProperty('childrenYearOfBirth')" elevation="4">
                            <v-icon>group</v-icon>
                            <v-layout row justify-center text-xs-center>
                                <v-flex xs12>
                                    Anzahl Kinder: {{propform.childrenYearOfBirth.length}}
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout v-else-if="propform.registrationFormType==='G'" row>
                    <v-flex xs12 mb-3>
                        <v-card>
                            <v-icon>group</v-icon>
                            <v-layout row justify-center text-xs-center>
                                <v-flex xs12>
                                    Gesamtzahl Mitreisende: {{propform.amountOfFellowPassengers}}
                                </v-flex>
                            </v-layout>
                            <v-divider/>
                            <v-layout row justify-center text-xs-center pb-3>
                                <v-flex md6>
                                    Kurtaxepflichtige Gäste: {{propform.amountPayTax}}
                                </v-flex>
                                <v-flex md6>
                                    Kurtaxebefreite Gäste: {{propform.amountTaxFree}}
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm6 :class="{'mb-3': $vuetify.breakpoint.smAndDown}">
                        <v-card>
                            <v-layout row justify-center text-xs-center>
                                <v-flex xs12>
                                    Passnummern zahlender Gäste
                                </v-flex>
                            </v-layout>
                            <v-divider/>
                            <v-layout row justify-center text-xs-center>
                                <v-flex v-for="ID in propform.payTaxIDs" xs12>
                                    {{ID}}
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm6>
                        <v-card>
                            <v-layout row justify-center text-xs-center>
                                <v-flex xs12>
                                    Passnummern befreiter Gäste
                                </v-flex>
                            </v-layout>
                            <v-divider/>
                            <v-layout row justify-center text-xs-center>
                                <v-flex v-for="ID in propform.taxFreeIDs" xs12>
                                    {{ID}}
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </v-flex>
                </v-layout>
                <v-layout v-else>
                    Oh no
                </v-layout>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>

    import FormData from '../assets/singleSampleRegistrationFormB';

    export default {
        name: "singularRegForm",
        components: {},
        props: {
            propform: Object
        },
        data() {
            return {
                form: null,
                title: null,
                hasChildren: null
            }
        },
        methods: {
            customFormatter(date) {
                return date;
            }
        },
        beforeMount() {
            this.form = FormData;
            this.title = "Meldeschein #" + this.propform.registrationNumber;

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