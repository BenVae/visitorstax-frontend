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
                        <span class="title">Fehler bei Meldescheinverarbeitung</span>
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
                            <v-card v-if="propform.formData.spouse.name !== ''" elevation="4">
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
                            <v-card v-if="propform.formData.childrenYearOfBirth.length != 0" elevation="4">
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
                                        Erwachsene (Urlaub): {{propform.formData.amountAdultHoliday}}
                                    </v-flex>
                                    <v-flex md3>
                                        Erwachsene (Geschäftlich): {{propform.formData.amountAdultBusiness}}
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
                <v-card-actions>
                    <template v-if="this.$store.getters.role === 'landlord'">
                        <v-btn block color="blue-grey"
                               @click="createGuestCard"
                               dark>Gästekarte drucken
                        </v-btn>
                    </template>
                    <template v-if="this.$store.getters.role === 'landlord' && propform.meta.state === 'unsubmitted'">
                        <v-btn block color="blue-grey"
                               @click="displayRegularFormEditor"
                               dark>Bearbeiten
                        </v-btn>
                        <v-btn block color="blue-grey"
                               @click="submitRegistrationForm"
                               dark>Abschicken
                        </v-btn>
                    </template>
                    <template v-else-if="this.$store.getters.role === 'city'">
                        <v-spacer></v-spacer>
                        <v-btn color="blue-grey"
                               @click="unsubmitRegistrationForm"
                               dark>Zur Bearbeitung freigeben
                        </v-btn>
                    </template>
                </v-card-actions>
            </v-card>
        </v-container>
        <v-container v-else>
            <h1>Leider wurde kein Meldeschein ausgewählt.</h1>
        </v-container>
        <img id='imgToExport' src='../../assets/exampleData/Constance_logo.png' style='display:none'/>
    </Layout>
</template>

<script>

    import Layout from "../utils/Layout";
    import Title from "../utils/Title"
    import {setSubmittedFlag, setUnsubmittedFlag} from "../../services/registrationFormService";

    export default {
        name: "singularRegForm",
        components: {Layout, Title},
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
            unsubmitRegistrationForm() {
                setUnsubmittedFlag(this.propform.meta.registrationNumber);
                this.$router.push({name: 'Meldescheine'});
            },
            customFormatter(date) {
                return this.$moment(date).format('DD.MM.YYYY');
            },
            displayRegularFormEditor() {
                if (this.propform.formData.registrationFormType === 'Regulär') {
                    this.$router.push({name: 'meldescheinBearbeiten', params: {form: this.propform}})
                } else {
                    this.$router.push({name: 'gruppenMeldescheinBearbeiten', params: {form: this.propform}})

                }
            },
            submitRegistrationForm() {
                setSubmittedFlag(this.propform.meta.registrationNumber);
                this.$router.push({name: 'Meldescheine'});
            },
            createGuestCard() {
                let pdfMake = require('pdfmake/build/pdfmake.js');
                let pdfFonts = require('pdfmake/build/vfs_fonts.js');
                pdfMake.vfs = pdfFonts.pdfMake.vfs;

                let imgToExport = document.getElementById('imgToExport');
                let canvas = document.createElement('canvas');
                canvas.width = imgToExport.width;
                canvas.height = imgToExport.height;
                canvas.getContext('2d').drawImage(imgToExport, 0, 0);
                canvas.toDataURL('image/png');

                let docDefinition = {
                    pageSize: {width: 400, height: 250},
                    content: [
                        {
                            layout: 'noBorders',
                            table: {
                                widths: ['*', '*'],
                                body: [
                                    [
                                        {text: this.getGuestcardTitle(), fontSize: 25, decoration: 'underline'},
                                        {image: canvas.toDataURL('image/png'), alignment: 'right', fit: [150, 100]}
                                    ],
                                    [
                                        this.getGuestcardContent(),
                                        {
                                            qr: this.propform.meta.registrationNumber.toString(),
                                            fit: '100',
                                            alignment: 'center',
                                            margin: [0, 15]
                                        },
                                    ]
                                ]
                            }
                        },
                    ]
                };
                pdfMake.createPdf(docDefinition).open();
            },
            getGuestcardTitle() {
                if (this.propform.formData.registrationFormType === 'Regulär') {
                    return "Gästekarte"
                } else {
                    return "Gruppen-Gästekarte "
                }
            },
            getGuestcardContent() {
                if (this.propform.formData.registrationFormType === 'Regulär') {
                    return this.regularGuestcardBody()
                } else {
                    return this.groupGuestcardBody()
                }

            },
            regularGuestcardBody() {
                return {
                    stack: [
                        '\n \n',
                        "Gast: " + this.getGuest(),
                        this.getSpouse(),
                        this.getPeriod()
                    ],
                    fontSize: 11
                };
            },
            groupGuestcardBody() {
                return {
                    stack: [
                        '\n \n',
                        "Gruppenleiter: " + this.getGuest(),
                        this.getAmountTaxpayers(),
                        this.getPeriod()

                    ],
                    fontSize: 11
                };
            },
            getAmountTaxpayers() {
                return "Anzahl Personen: " + this.propform.formData.amountAdultHoliday;
            },
            getGuest() {
                let guest = this.propform.formData.guest;

                return guest.surname + " " + guest.name;
            },
            getSpouse() {
                let spouse = this.propform.formData.spouse;

                if (spouse.name !== "") {
                    return "Lebenspartner/in: " + spouse.surname + " " + spouse.name;
                } else {
                    return "";
                }
            },
            getPeriod() {
                return this.$moment(this.propform.formData.arrivalDate).format('DD.MM.YYYY') + ' - ' +
                    this.$moment(this.propform.formData.departureDate).format('DD.MM.YYYY')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .top-buffer {
        margin-top: 10px;
    }
</style>