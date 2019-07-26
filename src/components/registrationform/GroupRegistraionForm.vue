<template>
    <Layout>
        <Title name="Gruppen-Meldeschein anlegen"/>
        <v-form ref="form">
            <v-container>
                <v-layout row justify-center>
                    <v-flex sm6 md3>
                        <v-select
                                v-model="formData.registrationFormType"
                                :items="types"
                                label="Art"
                                v-on:input="registrationFormTypeChanged"
                        ></v-select>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-select
                                :items="mietobjekte"
                                @change="selectBusinessObject"
                                item-text="text"
                                item-value="value"
                                :rules="[v => !!v || 'Bitte Mietobjekt auswählen']"
                                label="Mietobjekt"
                        ></v-select>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex md6>
                        <HotelDatePicker
                                format="DD.MM.YYYY"
                                :i18n="rangerpickerSettings"
                                @check-in-changed="setCheckinDate"
                                @check-out-changed="setCheckoutDate">
                        </HotelDatePicker>
                    </v-flex>
                </v-layout>
            </v-container>
            <row-with-description name="Reiseleiter">
                <v-layout row justify-center>
                    <v-flex sm4 md3>
                        <v-text-field
                                v-model="formData.guest.surname"
                                :rules="[v => !!v || 'Bitte Vorname eingeben']"
                                label="Vorname (nur Rufname)"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                v-model="formData.guest.name"
                                :rules="[v => !!v || 'Bitte Familienname eingeben']"
                                label="Familienname">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <BirthdayPicker
                                v-model="formData.guest.dateOfBirth"/>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex sm4 md3>
                        <v-text-field
                                v-model="formData.guest.passportSerialNumber"
                                :rules="[v => !!v || 'Bitte Passnummer eingeben']"
                                label="Passnummer">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Nationalität eingeben']"
                                v-model="formData.guest.nationality"
                                label="Nationalität">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Geburtsort eingeben']"
                                v-model="formData.guest.placeOfBirth"
                                label="Geburtsort">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex sm4 md3>
                        <v-text-field
                                v-model="formData.guest.address.streetAndNumber"
                                :rules="[v => !!v || 'Bitte Straße/Hausnummer eingeben']"
                                label="Straße/Hausnummer">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                v-model="formData.guest.address.zipCode"
                                :rules="[v => !!v || 'Bitte Postleihzahl eingeben']"
                                label="Postleizahl">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                v-model="formData.guest.address.city"
                                :rules="[v => !!v || 'Bitte Wohnort eingeben']"
                                label="Wohnort">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </row-with-description>
            <row-with-description
                    name="Gruppe">
                <v-layout row justify-center>
                    <v-table-overflow>

                    </v-table-overflow>
                    <table style="width:100%" class="ma-3">
                        <tr>
                            <th style="width: 40%">
                                Kategorie
                            </th>
                            <th style="width: 20%">
                                Anzahl
                            </th>
                            <th style="width: 40%">
                                <v-tooltip slot="prepend" bottom>
                                    <v-icon slot="activator" color="grey" dark>info</v-icon>
                                    <span>Bitte geben Sie die Passnummern aller Personen kommersepariert ein.<br>
                                        Beispiel: Passnummer1, Passnummer2, ...<br>
                                    </span>
                                </v-tooltip>
                                Passnummern
                            </th>
                        </tr>
                        <tr>
                            <td>
                                Erwachsene (Urlaub)
                            </td>
                            <td>
                                <v-text-field
                                        style="width: 100px"
                                        placeholder="0"
                                        v-model="formData.amountAdultHoliday"
                                        type="number"
                                        max="100"
                                        min="0">
                                </v-text-field>
                            </td>
                            <td rowspan="4">
                                <v-textarea
                                        solo
                                        auto-grow
                                        v-model="formData.passportSerialNumbers"
                                        placeholder="Beispiel: Passnummer1, Passnummer2, ..."
                                ></v-textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Erwachsene (Geschäftlich)
                            </td>
                            <td>
                                <v-text-field
                                        style="width: 100px"
                                        placeholder="0"
                                        v-model="formData.amountAdultBusiness"
                                        type="number"
                                        max="100"
                                        min="0">
                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Kinder (unter 16)
                            </td>
                            <td>
                                <v-text-field
                                        style="width: 100px"
                                        placeholder="0"
                                        v-model="formData.amountChildren"
                                        type="number"
                                        max="100"
                                        min="0">
                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Schwerbehinderte (RF)
                            </td>
                            <td>
                                <v-text-field
                                        style="width: 100px"
                                        placeholder="0"
                                        v-model="formData.amountHandicapped"
                                        type="number"
                                        max="100"
                                        min="0">
                                </v-text-field>
                            </td>
                        </tr>
                    </table>
                </v-layout>
            </row-with-description>
            <row-with-description name="Geschäftlichte Tätigkeit"
                                  v-if="hasBusinessVisitors">
                <v-layout row justify-center>
                    <v-flex sm6 md3>
                        <v-text-field
                                v-model="formData.business.amountConferenceVisitors"
                                label="Anzahl Tagungsbesucher"
                                type="number"
                                min="0"
                                :max="maxConferenceVisitor">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-text-field
                                v-model="formData.business.fieldOfBusiness"
                                label="Tätigkeitsfeld">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-text-field
                                v-model="formData.business.company"
                                label="Auftragsfirma">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </row-with-description>
            <v-layout align-end justify-end>
                <v-btn
                        @click="submitForm"
                        color="blue-grey"
                        dark>weiter
                </v-btn>
            </v-layout>
        </v-form>
    </Layout>
</template>

<script>
    import Layout from "../utils/StandardLayout";
    import Title from "../utils/Title";
    import RowWithDescription from "../utils/RowWithDescription";
    import HotelDatePicker from 'vue-hotel-datepicker'
    import BirthdayPicker from "../utils/BirthdayPicker";
    import {createRegistrationForm, getBusinessObjects} from "../../formSubmit";

    export default {
        name: "GroupRegistrationForm",
        components: {BirthdayPicker, RowWithDescription, Title, Layout, HotelDatePicker},
        methods: {
            customFormatter(date) {
                return this.$moment(date).format('DD.MM.YYYY');
            },
            setCheckinDate(newDate) {
                this.formData.arrivalDate = newDate;
            },
            setCheckoutDate(newDate) {
                this.formData.departureDate = newDate;
            },
            save(date) {
                this.$refs.menu.save(date)
            },
            toggleBusinessBoolean() {
                this.business = !this.business;
            },
            registrationFormTypeChanged(type) {
                if (type === 'Regulär') this.$router.push({path: '/meldeschein/anlegen'});
            },
            submitForm() {
                if (this.$refs.form.validate()) {
                    console.log(this.businessObject);
                    createRegistrationForm(this.formData, this.businessObject)
                }
            },
            selectBusinessObject(selectedObject) {
                this.businessObject = selectedObject;
            }
        },
        data: () => ({
            types: ['Regulär', 'Gruppe'],
            mietobjekte: [],
            businessObject: "",
            formData: {
                registrationFormType: 'Gruppe',
                arrivalDate: "",
                departureDate: "",
                guest: {
                    name: "",
                    surname: "",
                    dateOfBirth: null,
                    placeOfBirth: "",
                    nationality: "",
                    address: {
                        streetAndNumber: "",
                        zipCode: "",
                        city: "",
                        country: ""
                    },
                    passportSerialNumber: ""
                },
                amountChildren: 0,
                amountAdultBusiness: 0,
                amountAdultHoliday: 0,
                amountHandicapped: 0,
                passportSerialNumbers: "",
                business: {
                    amountConferenceVisitors: "",
                    fieldOfBusiness: "",
                    company: ""
                }
            },
            business: false,
            rangerpickerSettings: {
                night: 'Nacht',
                nights: 'Nächte',
                'check-in': 'check-in',
                'check-out': 'check-out',
                'day-names': ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                'month-names': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            },
            menu: false
        }),
        computed: {
            maxConferenceVisitor: function () {
                return this.formData.amountAdultBusiness;
            },
            hasBusinessVisitors: function () {
                return this.formData.amountAdultBusiness > 0;
            }
        },
        watch: {
            menu(val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            }
        },
        beforeMount() {
            this.mietobjekte = getBusinessObjects();
        }
    }
</script>

<style lang="scss" scoped>
    .white-background {
        background-color: #FFF !important;
    }

    .scroll-here {
        overflow: auto;
        height: 740px;
    }
</style>