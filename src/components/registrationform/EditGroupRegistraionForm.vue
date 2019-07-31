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
                                readonly
                        ></v-select>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-select
                                :items="mietobjekte"
                                v-model="businessObject"
                                @change="selectBusinessObject"
                                item-text="text"
                                item-value="value"
                                :rules="[v => !!v || 'Bitte Mietobjekt auswählen']"
                                label="Mietobjekt"
                        ></v-select>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex md3>
                        <RegularDatePicker name="Anreisedatum"
                                           :datum="formData.arrivalDate"
                                           v-model="formData.arrivalDate">
                        </RegularDatePicker>
                    </v-flex>
                    <v-flex md3>
                        <RegularDatePicker name="Abreisedatum"
                                           :datum="formData.departureDate"
                                           v-model="formData.departureDate">
                        </RegularDatePicker>
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
                                :rules="[v => !!v || 'Bitte Tätigkeitsfeld eingeben']"
                                label="Tätigkeitsfeld">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-text-field
                                v-model="formData.business.company"
                                :rules="[v => !!v || 'Bitte Auftragsfirma eingeben']"
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
    import BirthdayPicker from "../utils/BirthdayPicker";
    import {getBusinessObjects, updateRegistrationForm} from "../utils/script/registrationFormService";
    import RegularDatePicker from "../utils/RegularDatePicker";

    export default {
        name: "GroupRegistrationForm",
        components: {RegularDatePicker, BirthdayPicker, RowWithDescription, Title, Layout},
        methods: {
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
            submitForm() {
                if (this.$refs.form.validate()) {
                    updateRegistrationForm(this.formData, this.businessObject.value, this.form.meta.registrationNumber);
                    this.$router.push({name: 'Meldescheine'})
                }
            },
            selectBusinessObject(selectedObject) {
                this.businessObject = selectedObject;
            }
        },
        props: {
            form: Object
        },
        data() {
            return {
                types: ['Regulär', 'Gruppe'],
                mietobjekte: [],
                businessObject: "",
                formData: {},
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

            this.formData = this.form.formData;

            if (this.form.formData.business.fieldOfBusiness !== "") {
                this.business = true;
            }

            this.businessObject = {
                text: this.form.meta.businessObject.address.streetAndNumber,
                value: this.form.meta.businessObject
            };
        }
    }
</script>
