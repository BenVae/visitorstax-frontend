<template>
    <Layout>
        <Title name="Meldeschein anlegen"/>
        <b-row class="pt-3 justify-content-center">
            <b-col md="3" sm="6">
                    <v-select
                            :items="items"
                            label="Art"
                    ></v-select>
            </b-col>
            <b-col md="3" sm="6">
                    <v-select
                            :items="mietobjekte"
                            label="Mietobjekt"
                    ></v-select>
            </b-col>
        </b-row>
        <b-row class="pt-3 justify-content-md-center mb-3">
            <b-col md="6">
                <HotelDatePicker
                        format="DD.MM.YYYY"
                        :i18n="ptBr"
                        @check-in-changed="setCheckinDate"
                        @check-out-changed="setCheckoutDate">
                </HotelDatePicker>
            </b-col>
        </b-row>
        <RowWithDescription name="Gast">
            <b-col md="3" sm="6">
                <v-text-field
                        label="Vorname (nur Rufname)"
                        >
                </v-text-field>
            </b-col>
            <b-col md="3" sm="6">
                <v-text-field
                        label="Familienname">
                </v-text-field>
            </b-col>
            <div class="w-100 d-none d-md-block"></div>
            <b-col md="2" sm="4">
                <BirthdayPicker/>
            </b-col>
            <b-col md="2" sm="4">
                <v-text-field
                        label="Passnummer">
                </v-text-field>
            </b-col>
            <b-col md="2" sm="4">
                <v-text-field
                        label="Nationalität">
                </v-text-field>
            </b-col>
        </RowWithDescription>
        <RowWithDescription name="Ehegatte/Lebenspartner"
                            :is-in-use="isInUse">
            <b-col class="text-center" v-if="!isInUse">
                <CloseIcon class="icon-2x"></CloseIcon>
            </b-col>
        </RowWithDescription>
    </Layout>
</template>

<script>
    import Layout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    import RowWithDescription from "./utils/RowWithDescription";
    import HotelDatePicker from 'vue-hotel-datepicker'
    import BirthdayPicker from "./utils/BirthdayPicker";
    import CloseIcon from "vue-material-design-icons/Close";


    export default {
        name: "RegistrationForm",
        components: {BirthdayPicker, RowWithDescription, Title, Layout, HotelDatePicker, CloseIcon},
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
            save (date) {
                this.$refs.menu.save(date)
            }
        },
        data: () => ({
            items: ['Regulär', 'Gruppe'],
            mietobjekte: ['Alemannstr. 5', 'Hohneckerstr. 10'],
            startDate: "",
            endDate: "",
            dateOfBirth: "",
            range: {},
            isInUse: false,
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
            menu (val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            }
        },
    }
</script>

<style lang="scss" scoped>
    .white-background {
        background-color: #FFF !important;
    }
</style>