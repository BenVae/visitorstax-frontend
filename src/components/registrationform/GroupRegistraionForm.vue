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
                    <v-flex sm4 md2>
                        <v-text-field
                                label="Vorname (nur Rufname)"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                label="Familienname">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <BirthdayPicker/>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex sm4 md2>
                        <v-text-field
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
            </row-with-description>
            <row-with-description
                    name="Adresse">
                <v-layout row justify-center>
                    <v-flex sm6 md3>
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
                    <table style="width:100%">
                        <tr>
                            <th style="width: 40%">
                                Kategorie
                            </th>
                            <th style="width: 20%">
                                Anzahl
                            </th>
                            <th style="width: 40%">
                                Ausweisnummern
                            </th>
                        </tr>
                        <tr>
                            <td>
                                Erwachsene (Freizeit)
                            </td>
                            <td>
                                <v-text-field
                                        style="width: 100px"
                                        placeholder="0"
                                        clearable
                                        v-model="amountAdultFree"
                                        type="number"
                                        max="100"
                                        min="0">
                                </v-text-field>
                            </td>
                            <td>
                                <v-text-field>
                                </v-text-field>
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
                            <td>
                                <v-text-field>
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
                            <td>
                                <v-text-field>
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
                                        v-model="amountDisabled"
                                        type="number"
                                        max="100"
                                        min="0">
                                </v-text-field>
                            </td>
                            <td>
                                <v-text-field>
                                </v-text-field>
                            </td>
                        </tr>
                    </table>
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
                                    label="Anzahl geschäftl. tätiger Personen"
                                    type="number"
                                    min="0"
                                    :max="amountLiable"
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex sm6 md3>
                            <v-text-field
                                    label="Auftragsfirma">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row justify-center>
                        <v-flex sm6 md3>
                            <v-text-field
                                    label="Anzahl Tagungsbesucher"
                                    type="number"
                                    min="0"
                                    :max="amountLiable"
                            >
                            </v-text-field>
                        </v-flex>
                        <v-flex sm6 md3>
                            <v-text-field
                                    label="Tätigkeitsfeld">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </template>
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
    import PlusIcon from "vue-material-design-icons/Plus";

    export default {
        name: "GroupRegistrationForm",
        components: {PlusIcon, BirthdayPicker, RowWithDescription, Title, Layout, HotelDatePicker},
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
            amountAdultFree: null,
            amountDisabled: null,
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