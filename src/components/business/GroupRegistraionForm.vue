<template>
    <Layout>
        <Title name="Gruppen-Meldeschein anlegen"/>
        <v-form ref="form">
            <v-container>
                <v-layout justify-center row>
                    <v-flex md3 sm6>
                        <v-select
                                :items="types"
                                label="Art"
                                v-model="formData.registrationFormType"
                                v-on:input="registrationFormTypeChanged"
                        ></v-select>
                    </v-flex>
                    <v-flex md3 sm6>
                        <v-select
                                :items="mietobjekte"
                                :rules="[v => !!v || 'Bitte Mietobjekt auswählen']"
                                @change="selectBusinessObject"
                                item-text="text"
                                item-value="value"
                                label="Mietobjekt"
                        ></v-select>
                    </v-flex>
                </v-layout>
                <v-layout justify-center row>
                    <v-flex md6>
                        <HotelDatePicker
                                :i18n="rangepickerSettings"
                                @check-in-changed="setCheckinDate"
                                @check-out-changed="setCheckoutDate"
                                format="DD.MM.YYYY">
                        </HotelDatePicker>
                    </v-flex>
                </v-layout>
            </v-container>
            <row-with-description name="Reiseleiter">
                <v-layout justify-center row>
                    <v-flex md3 sm4>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Vorname eingeben']"
                                label="Vorname (nur Rufname)"
                                v-model="formData.guest.surname"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex md2 sm4>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Familienname eingeben']"
                                label="Familienname"
                                v-model="formData.guest.name">
                        </v-text-field>
                    </v-flex>
                    <v-flex md2 sm4>
                        <BirthdayPicker
                                v-model="formData.guest.dateOfBirth"/>
                    </v-flex>
                </v-layout>
                <v-layout justify-center row>
                    <v-flex md3 sm4>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Passnummer eingeben']"
                                label="Passnummer"
                                v-model="formData.guest.passportSerialNumber">
                        </v-text-field>
                    </v-flex>
                    <v-flex md2 sm4>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Nationalität eingeben']"
                                label="Nationalität"
                                v-model="formData.guest.nationality">
                        </v-text-field>
                    </v-flex>
                    <v-flex md2 sm4>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Geburtsort eingeben']"
                                label="Geburtsort"
                                v-model="formData.guest.placeOfBirth">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout justify-center row>
                    <v-flex md3 sm4>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Straße/Hausnummer eingeben']"
                                label="Straße/Hausnummer"
                                v-model="formData.guest.address.streetAndNumber">
                        </v-text-field>
                    </v-flex>
                    <v-flex md2 sm4>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Postleihzahl eingeben']"
                                label="Postleizahl"
                                v-model="formData.guest.address.zipCode">
                        </v-text-field>
                    </v-flex>
                    <v-flex md2 sm4>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Wohnort eingeben']"
                                label="Wohnort"
                                v-model="formData.guest.address.city">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </row-with-description>
            <row-with-description
                    name="Gruppe">
                <v-layout justify-center row>
                    <table class="ma-3" id="groupDataTable">
                        <tr>
                            <th style="width: 40%">
                                Kategorie
                            </th>
                            <th style="width: 20%">
                                Anzahl
                            </th>
                            <th style="width: 40%">
                                <v-tooltip bottom slot="prepend">
                                    <v-icon color="grey" dark slot="activator">info</v-icon>
                                    <span>Bitte geben Sie die Passnummern aller Personen kommasepariert ein.<br>
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
                                        max="100"
                                        min="0"
                                        placeholder="0"
                                        style="width: 100px"
                                        type="number"
                                        v-model="formData.amountAdultHoliday">
                                </v-text-field>
                            </td>
                            <td rowspan="4">
                                <v-textarea
                                        auto-grow
                                        placeholder="Beispiel: Passnummer1, Passnummer2, ..."
                                        solo
                                        v-model="formData.passportSerialNumbers"
                                ></v-textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Erwachsene (Geschäftlich)
                            </td>
                            <td>
                                <v-text-field
                                        max="100"
                                        min="0"
                                        placeholder="0"
                                        style="width: 100px"
                                        type="number"
                                        v-model="formData.amountAdultBusiness">
                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Kinder (unter 16)
                            </td>
                            <td>
                                <v-text-field
                                        max="100"
                                        min="0"
                                        placeholder="0"
                                        style="width: 100px"
                                        type="number"
                                        v-model="formData.amountChildren">
                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Schwerbehinderte (RF)
                            </td>
                            <td>
                                <v-text-field
                                        max="100"
                                        min="0"
                                        placeholder="0"
                                        style="width: 100px"
                                        type="number"
                                        v-model="formData.amountHandicapped">
                                </v-text-field>
                            </td>
                        </tr>
                    </table>
                </v-layout>
            </row-with-description>
            <row-with-description name="Geschäftlichte Tätigkeit"
                                  v-if="hasBusinessVisitors">
                <v-layout justify-center row>
                    <v-flex md3 sm6>
                        <v-text-field
                                :max="maxConferenceVisitor"
                                label="Anzahl Tagungsbesucher"
                                min="0"
                                type="number"
                                v-model="formData.business.amountConferenceVisitors">
                        </v-text-field>
                    </v-flex>
                    <v-flex md3 sm6>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Tätigkeitsfeld eingeben']"
                                label="Tätigkeitsfeld"
                                v-model="formData.business.fieldOfBusiness">
                        </v-text-field>
                    </v-flex>
                    <v-flex md3 sm6>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Auftragsfirma eingeben']"
                                label="Auftragsfirma"
                                v-model="formData.business.company">
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
    import Layout from "../utils/Layout";
    import Title from "../utils/Title";
    import RowWithDescription from "../utils/RowWithDescription";
    import HotelDatePicker from 'vue-hotel-datepicker'
    import BirthdayPicker from "../utils/BirthdayPicker";
    import {createRegistrationForm, getBusinessObjects} from "../../services/registrationFormService";

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
                    createRegistrationForm(this.formData, this.businessObject);
                    this.$router.push({name: 'Meldescheine'})
                }
            },
            selectBusinessObject(selectedObject) {
                this.businessObject = selectedObject;
            }
        },
        data() {
            return {
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
                rangepickerSettings: {
                    night: 'Nacht',
                    nights: 'Nächte',
                    'check-in': 'check-in',
                    'check-out': 'check-out',
                    'day-names': ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                    'month-names': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                },
                menu: false
            }
        },
        computed: {
            maxConferenceVisitor: function () {
                return this.formData.amountAdultBusiness;
            },
            hasBusinessVisitors: function () {
                return this.formData.amountAdultBusiness > 0;
            }
        },
        beforeMount() {
            this.mietobjekte = getBusinessObjects();
        }
    }
</script>

<style lang="scss">
    #groupDataTable {
        width: 100%;
        overflow-x: auto;
    }
</style>
