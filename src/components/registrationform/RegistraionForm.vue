<template>
    <Layout>
        <Title name="Meldeschein anlegen"/>
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
                                required
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
                                :i18n="rangepickerSettings"
                                @check-in-changed="setCheckinDate"
                                @check-out-changed="setCheckoutDate">
                        </HotelDatePicker>
                    </v-flex>
                </v-layout>
            </v-container>
            <row-with-description name="Gast">
                <v-layout row justify-center>
                    <v-flex sm6 md3>
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
                    <v-flex sm6 md3>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Passnummer eingeben']"
                                v-model="formData.guest.passportSerialNumber"
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
            </row-with-description>
            <row-with-description name="Ehegatte/Lebenspartner"
                                  :closable="hasSpouse"
                                  @destroyCloseIcon="toggleSpouseBoolean">
                <v-flex class="text-center"
                        v-if="!hasSpouse">
                    <plus-icon
                            class="show-pointer"
                            v-on:click="toggleSpouseBoolean"
                            :size="48"
                            fill-color="#607D8B"
                    />
                </v-flex>
                <template v-else>
                    <v-layout row justify-center>
                        <v-flex sm6 md3>
                            <v-text-field
                                    v-model="formData.spouse.surname"
                                    :rules="[v => !!v || 'Bitte Vorname eingeben']"
                                    label="Vorname (nur Rufname)"
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex sm4 md2>
                            <v-text-field
                                    v-model="formData.spouse.name"
                                    :rules="[v => !!v || 'Bitte Familienname eingeben']"
                                    label="Familienname">
                            </v-text-field>
                        </v-flex>
                        <v-flex sm4 md2>
                            <BirthdayPicker
                                    v-model="formData.spouse.dateOfBirth"/>
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-center>
                        <v-flex sm6 md3>
                            <v-text-field
                                    v-model="formData.spouse.passportSerialNumber"
                                    :rules="[v => !!v || 'Bitte Passnummer eingeben']"
                                    label="Passnummer">
                            </v-text-field>
                        </v-flex>
                        <v-flex sm4 md2>
                            <v-text-field
                                    v-model="formData.spouse.nationality"
                                    :rules="[v => !!v || 'Bitte Nationalität eingeben']"
                                    label="Nationalität">
                            </v-text-field>
                        </v-flex>
                        <v-flex sm4 md2>
                            <v-text-field
                                    v-model="formData.spouse.placeOfBirth"
                                    :rules="[v => !!v || 'Bitte Geburtsort eingeben']"
                                    label="Geburtsort">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </template>
            </row-with-description>
            <row-with-description
                    name="Adresse">
                <v-layout row justify-center>
                    <v-flex sm6 md3>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Straße/Hausnummer eingeben']"
                                v-model="formData.guest.address.streetAndNumber"
                                label="Straße/Hausnummer">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Postleihzahl eingeben']"
                                v-model="formData.guest.address.zipCode"
                                label="Postleizahl">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Wohnort eingeben']"
                                v-model="formData.guest.address.city"
                                label="Wohnort">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </row-with-description>
            <row-with-description
                    name="Kinder">
                <v-layout row justify-center>
                    <v-flex sm6 md3>
                        <v-text-field
                                v-model="amountChildren"
                                label="Anzahl Kinder"
                                type="number"
                                max="5"
                                min="0">
                            <v-tooltip slot="prepend" bottom>
                                <v-icon slot="activator" color="grey" dark>info</v-icon>
                                <span>Bitte nur Kinder unter 16 Jahren eintragen. Kinder über 16 benötigen einen eigenen Meldeschein</span>
                            </v-tooltip>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex sm4 md2
                            v-for="(items, index) in childrenSize"
                            :key="index">
                        <v-text-field
                                :label="`Geburtsjahr Kind ${index + 1}`"
                                v-model="formData.childrenYearOfBirth[index]"
                                :rules="[v => !!v || 'Bitte Geburtsjahr eingeben']"
                                type="number"
                                max="16"
                                min="0">
                        </v-text-field>
                    </v-flex>
                </v-layout>

            </row-with-description>
            <row-with-description name="Geschäftlichte Tätigkeit"
                                  :closable="business"
                                  @destroyCloseIcon="toggleBusinessBoolean">
                <v-flex class="text-center"
                        v-if="!business">
                    <plus-icon
                            class="show-pointer"
                            v-on:click="toggleBusinessBoolean"
                            :size="48"
                            fill-color="#607D8B"
                    />
                </v-flex>
                <template v-else>
                    <v-layout row justify-center>
                        <v-flex sm6 md3>
                            <v-text-field
                                    v-model="formData.business.amountBusinessAdults"
                                    label="Anzahl geschäftl. tätiger Personen"
                                    type="number"
                                    min="0"
                                    :max="amountAdults"
                            >
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
                    <v-layout row justify-center>
                        <v-flex sm6 md3>
                            <v-text-field
                                    v-model="formData.business.amountConferenceVisitors"
                                    label="Anzahl Tagungsbesucher"
                                    type="number"
                                    min="0"
                                    :max="this.formData.business.amountBusinessAdults"
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex sm6 md3>
                            <v-text-field
                                    v-model="formData.business.fieldOfBusiness"
                                    :rules="[v => !!v || 'Bitte Tätigkeitsfeld eingeben']"
                                    label="Tätigkeitsfeld">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </template>
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
    import PlusIcon from "vue-material-design-icons/Plus";
    import {createRegistrationForm, getBusinessObjects} from "../utils/script/registrationFormService";

    export default {
        name: "RegistrationForm",
        components: {PlusIcon, BirthdayPicker, RowWithDescription, Title, Layout, HotelDatePicker},
        methods: {
            customFormatter(date) {
                return this.$moment(date).format('YYYY-MM-DD');
            },
            setCheckinDate(newDate) {
                this.formData.arrivalDate = this.customFormatter(newDate);
            },
            setCheckoutDate(newDate) {
                this.formData.departureDate = this.customFormatter(newDate);
            },
            save(date) {
                this.$refs.menu.save(date)
            },
            toggleSpouseBoolean() {
                this.hasSpouse = !this.hasSpouse;
            },
            toggleBusinessBoolean() {
                this.business = !this.business;
            },
            registrationFormTypeChanged(type) {
                if (type === 'Gruppe') this.$router.push({path: '/gruppenMeldeschein/anlegen'});
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
        computed: {
            childrenSize: function () {
                let childArray = [];
                for (let index = 0; index < this.amountChildren; index++) {
                    childArray.push('');
                }
                return childArray;
            },
            amountAdults: function () {
                return this.hasSpouse ? 2 : 1;
            }
        },
        data() {
            return {
                types: ['Regulär', 'Gruppe'],
                mietobjekte: [],
                businessObject: "",
                formData: {
                    registrationFormType: 'Regulär',
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
                    spouse: {
                        name: "",
                        surname: "",
                        dateOfBirth: null,
                        placeOfBirth: "",
                        nationality: "",
                        passportSerialNumber: ""
                    },
                    business: {
                        amountBusinessAdults: 0,
                        amountConferenceVisitors: 0,
                        fieldOfBusiness: "",
                        company: ""
                    },
                    childrenYearOfBirth: [],
                },
                amountChildren: 0,
                hasSpouse: false,
                business: false,
                rangepickerSettings: {
                    night: 'Nacht',
                    nights: 'Nächte',
                    'check-in': 'check-in',
                    'check-out': 'check-out',
                    'day-names': ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                    'month-names': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                },
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
