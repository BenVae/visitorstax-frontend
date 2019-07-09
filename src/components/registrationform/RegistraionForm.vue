<template>
    <Layout>
        <Title name="Meldeschein anlegen"/>
        <v-form>
            <v-container>
                <v-layout row justify-center>
                    <v-flex sm6 md3>
                        <v-select
                                :items="items"
                                label="Art"
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
            <row-with-description name="Gast">
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
                        <v-flex sm4 md2>
                            <v-text-field
                                    label="Vorname (nur Rufname)">
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
                </template>
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
                    name="Kinder">
                <v-layout row justify-center>
                    <v-flex sm6 md3>
                        <v-text-field
                                v-model="amountChilds"
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
                                label="Kind"
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
                                    label="Anzahl geschäftl. tätiger Personen"
                                    type="number"
                                    min="0"
                                    :max="amountPersons"
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
                                    :max="amountPersons"
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
        name: "RegistrationForm",
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
            toggleSpouseBoolean() {
                this.hasSpouse = !this.hasSpouse;
            },
            toggleBusinessBoolean() {
                this.business = !this.business;
            }
        },
        computed: {
            childrenSize: function () {
                let childArray = [];
                for (let index = 0; index < this.amountChilds; index++) {
                    childArray.push('');
                }
                return childArray;
            },
            amountPersons: function () {
                return this.hasSpouse ? 2 : 1;
            }
        },
        data: () => ({
            items: ['Regulär', 'Gruppe'],
            mietobjekte: ['Alemannstr. 5', 'Hohneckerstr. 10'],
            startDate: "",
            endDate: "",
            dateOfBirth: "",
            range: {},
            hasSpouse: false,
            business: false,
            amountChilds: 0,
            children: [],
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