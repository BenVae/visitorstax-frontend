<template>
    <Layout>
        <Title :name="title"></Title>
        <v-container v-if="propform!=null">
            <v-card elevation="10" color="#e9e9e9">
                <v-card-title>
                    {{customFormatter(propform.formData.arrivalDate)}} -
                    {{customFormatter(propform.formData.departureDate)}}
                    <v-spacer/>
                    <template v-if="propform.formData.registrationFormType==='Regulär'">
                        <span class="title">Regulär</span>
                        <v-spacer/>
                    </template>
                    <template v-else-if="propform.formData.registrationFormType==='Gruppe'">
                        <span class="title">Gruppe</span>
                        <v-spacer/>
                    </template>
                    <template v-else>
                        <space class="title">Fehler bei Meldescheinverarbeitung</space>
                        <v-spacer/>
                    </template>
                    {{propform.meta.businessObject.address.streetAndNumber}}
                </v-card-title>
                <v-container grid-list-lg>
                    <v-layout row>
                        <v-flex xs12 md8 mb-3>
                            <v-card elevation="4">
                                <v-icon>person</v-icon>
                                <v-layout row justify-center text-xs-center>
                                    <v-flex xs12 sm4>
                                        {{propform.formData.guest.name}} {{propform.formData.guest.surname}}
                                    </v-flex>
                                    <v-flex sm1 md2/>
                                    <v-flex xs12 sm4>
                                        geboren {{customFormatter(propform.formData.guest.dateOfBirth)}}
                                    </v-flex>
                                </v-layout>
                                <v-divider/>
                                <v-layout row justify-center text-xs-center pb-3>
                                    <v-flex xs12 sm4>
                                        Passnummer: {{propform.formData.guest.passportSerialNumber}}
                                    </v-flex>
                                    <v-flex sm1 md2/>
                                    <v-flex xs12 sm4>
                                        Nationalität: {{propform.formData.guest.nationality}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 md4 :class="{'mb-3': $vuetify.breakpoint.smAndDown}">
                            <v-card elevation="4">
                                <v-icon>local_offer</v-icon>
                                <v-layout row justify-center text-xs-center>
                                    <v-flex xs12>
                                        {{propform.formData.guest.address.streetAndNumber}}
                                    </v-flex>
                                    <v-divider/>
                                </v-layout>
                                <v-divider/>
                                <v-layout row justify-center text-xs-center pb-3>
                                    <v-flex xs12>
                                        {{propform.formData.guest.address.zipCode}}
                                        {{propform.formData.guest.address.city}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-layout v-if="propform.formData.registrationFormType==='Regulär'" row>
                        <v-flex xs12 sm8>
                            <v-card v-if="propform.hasOwnProperty('partnerName')" elevation="4">
                                <v-icon>loyalty</v-icon>
                                <v-layout row justify-center text-xs-center>
                                    <v-flex xs12>
                                        {{propform.formData.spouse.name}} {{propform.formData.spouse.surname}}
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        geboren {{customFormatter(propform.formData.spouse.dateOfBirth)}}
                                    </v-flex>
                                    <v-flex xs12 sm6>
                                        Nationalität: {{propform.formData.spouse.nationality}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 sm4>
                            <v-card v-if="propform.formData.hasOwnProperty('childrenYearOfBirth')" elevation="4">
                                <v-icon>group</v-icon>
                                <v-layout row justify-center text-xs-center>
                                    <v-flex xs12>
                                        Anzahl Kinder: {{propform.formData.childrenYearOfBirth.length}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-layout v-else-if="propform.formData.registrationFormType==='Gruppe'" row>
                        <v-flex xs12 mb-3>
                            <v-card>
                                <v-icon>group</v-icon>
                                <v-layout row justify-center text-xs-center>
                                    <v-flex xs12>
                                        Gesamtzahl Mitreisende: {{propform.meta.amountOfFellowPassengers}}
                                    </v-flex>
                                </v-layout>
                                <v-divider/>
                                <v-layout row justify-center text-xs-center pb-3>
                                    <v-flex md3>
                                        Erwachene (Urlaub): {{propform.formData.amountAdultHoliday}}
                                    </v-flex>
                                    <v-flex md3>
                                        Erwachene (Geschäftlich): {{propform.formData.amountAdultBusiness}}
                                    </v-flex>
                                    <v-flex md3>
                                        Kinder (unter 16): {{propform.formData.amountChildren}}
                                    </v-flex>
                                    <v-flex md3>
                                        Schwerbehinderte (RF): {{propform.formData.amountHandicapped}}
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 mb-3>
                            <v-card>
                                <v-layout row justify-center text-xs-center>
                                    <v-flex xs12>
                                        Passnummern
                                    </v-flex>
                                </v-layout>
                                <v-divider/>
                                <v-layout row justify-center text-xs-center>
                                    <v-flex xs12>
                                        {{propform.formData.passportSerialNumbers}}
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
        <v-container v-else>
            <h1>Leider wurde kein Meldeschein ausgewählt.</h1>
        </v-container>
    </Layout>
</template>

<script>

    import Layout from "./utils/StandardLayout";
    import Title from "./utils/Title"

    export default {
        name: "singularRegForm",
        components: {Layout,Title},
        props: {
            propform: Object
        },
        data() {
            return {
                title: null,
                hasChildren: null
            }
        },
        beforeMount() {
            if (typeof this.propform != "undefined") {
                this.title = "Meldeschein #" + this.propform.meta.registrationNumber
            } else {
                this.title = "Fehler"
            }
        },
        methods: {
            customFormatter(date) {
                return this.$moment(date).format('DD.MM.YYYY');
            }
        }
    }
</script>

<style lang="scss" scoped>

    .top-buffer {
        margin-top: 10px;
    }

</style>