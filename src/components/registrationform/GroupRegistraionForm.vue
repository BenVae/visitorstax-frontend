<template>
    <Layout>
        <Title name="Gruppen-Meldeschein anlegen"/>
        <v-form>
            <v-container>
                <v-layout row justify-center>
                    <v-flex sm6 md3>
                        <v-select
                                v-model="type"
                                :items="types"
                                label="Art"
                                v-on:input="registrationFormTypeChanged"
                        ></v-select>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-select
                                :items="mietobjekte"
                                label="Mietobjekt"
                        ></v-select>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex md6>
                        <HotelDatePicker
                                format="DD.MM.YYYY"
                                :i18n="ptBr"
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
                                v-model="surname"
                                label="Vorname (nur Rufname)"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                v-model="name"
                                label="Familienname">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <BirthdayPicker/>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex sm4 md3>
                        <v-text-field
                                v-model="pass"
                                label="Passnummer">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                label="Nationalität">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                label="Geburtsort">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex sm4 md3>
                        <v-text-field
                                label="Straße/Hausnummer">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                label="Postleizahl">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
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
                                        clearable
                                        v-model="amountAdultHoliday"
                                        type="number"
                                        max="100"
                                        min="0">
                                </v-text-field>
                            </td>
                            <td rowspan="4">
                                <v-textarea
                                        solo
                                        auto-grow
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
                                        clearable
                                        v-model="amountAdultBusiness"
                                        type="number"
                                        max="100"
                                        min="0">
                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Anzahl Kinder (unter 16)
                            </td>
                            <td>
                                <v-text-field
                                        style="width: 100px"
                                        placeholder="0"
                                        clearable
                                        v-model="amountChildren"
                                        type="number"
                                        max="100"
                                        min="0">
                                </v-text-field>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Anzahl Schwerbehinderte (RF)
                            </td>
                            <td>
                                <v-text-field
                                        style="width: 100px"
                                        placeholder="0"
                                        clearable
                                        v-model="amountHandicapped"
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
                                label="Anzahl Tagungsbesucher"
                                type="number"
                                min="0"
                                :max="maxConferenceVisitor">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-text-field
                                label="Tätigkeitsfeld">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-text-field
                                label="Auftragsfirma">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </row-with-description>
            <v-layout align-end justify-end>
                <v-btn color="blue-grey" dark>weiter</v-btn>
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

    export default {
        name: "GroupRegistrationForm",
        components: {BirthdayPicker, RowWithDescription, Title, Layout, HotelDatePicker},
        methods: {
            customFormatter(date) {
                return this.$moment(date).format('DD.MM.YYYY');
            },
            setCheckinDate(newDate) {
                this.startDate = this.customFormatter(newDate);
            },
            setCheckoutDate(newDate) {
                this.endDate = this.customFormatter(newDate);
            },
            save(date) {
                this.$refs.menu.save(date)
            },
            toggleBusinessBoolean() {
                this.business = !this.business;
            },
            registrationFormTypeChanged(type) {
                if (type === 'Regulär') this.$router.push({path: '/meldeschein/anlegen'});
            }
        },
        data: () => ({
            types: ['Regulär', 'Gruppe'],
            type: 'Gruppe',
            mietobjekte: ['Alemannstr. 5', 'Hohneckerstr. 10'],
            startDate: "",
            endDate: "",
            dateOfBirth: "",
            range: {},
            business: false,
            amountChildren: null,
            amountAdultBusiness: null,
            amountAdultHoliday: null,
            amountHandicapped: null,
            ptBr: {
                night: 'Nacht',
                nights: 'Nächte',
                'check-in': 'check-in',
                'check-out': 'check-out',
                'day-names': ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                'month-names': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            },
            date: null,
            menu: false
        }),
        computed: {
            maxConferenceVisitor: function () {
                return this.amountAdultBusiness;
            },
            hasBusinessVisitors: function () {
                return this.amountAdultBusiness > 0;
            }
        },
        watch: {
            menu(val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            }
        },
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