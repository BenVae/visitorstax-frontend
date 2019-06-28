<template>
    <Layout>
        <Title name="Meldeschein anlegen"/>
        <b-row class="pt-3 justify-content-center">
            <b-col md="3" sm="6">
                <b-form-group>
                    <label for="registrationFormType">Art</label>
                    <b-form-select size="sm" id="registrationFormType">
                        <option>Regulär</option>
                        <option>Gruppe</option>
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col md="3" sm="6">
                <b-form-group>
                    <label for="businessObject">Mietobjekt</label>
                    <select class="form-control form-control-sm" id="businessObject">
                        <option>Alemannenstr. 5</option>
                        <option>Petersplatz 4</option>
                    </select>
                </b-form-group>
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
                <b-form-group>
                    <label for="surname">Vorname (nur Rufname)</label>
                    <input class="form-control form-control-sm" id="surname">
                </b-form-group>
            </b-col>
            <b-col md="3" sm="6">
                <b-form-group>
                    <label for="name">Familienname</label>
                    <input class="form-control form-control-sm" id="name">
                </b-form-group>
            </b-col>
            <div class="w-100 d-none d-md-block"></div>
            <b-col md="2" sm="4">
                <b-form-group>
                    <label>Geburtsdatum</label>
                    <Datepicker
                            v-model="dateOfBirth"
                            :bootstrap-styling="true"
                            :format="customFormatter">
                    </Datepicker>
                    {{dateOfBirth}}
                </b-form-group>
            </b-col>
            <b-col md="2" sm="4">
                <b-form-group>
                    <label for="passportSerialNumber">Passnummer</label>
                    <input class="form-control form-control-sm" id="passportSerialNumber">
                </b-form-group>
            </b-col>
            <b-col md="2" sm="4">
                <b-form-group>
                    <label
                            for="nationality">Nationalität</label>
                    <input class="form-control form-control-sm" id="nationality">
                </b-form-group>
            </b-col>
        </RowWithDescription>
        <RowWithDescription name="bilder">
            <b-col md="3" sm="6">
                <b-form-group>
                    <label for="test">Mietobjekt</label>
                    <select class="form-control form-control-sm" id="test">
                        <option>Alemannenstr. 5</option>
                        <option>Petersplatz 4</option>
                    </select>
                </b-form-group>
            </b-col>
        </RowWithDescription>
    </Layout>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import Layout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    import RowWithDescription from "./utils/RowWithDescription";
    import HotelDatePicker from 'vue-hotel-datepicker'


    export default {
        name: "RegistrationForm",
        components: {RowWithDescription, Title, Layout, Datepicker, HotelDatePicker},
        methods: {
            customFormatter(date) {
                return this.$moment(date).format('DD.MM.YYYY');
            },
            setCheckinDate(newDate) {
                this.startDate = this.customFormatter(newDate);
            },
            setCheckoutDate(newDate) {
                this.endDate = this.customFormatter(newDate);
            }
        },
        data() {
            return {
                startDate: "",
                endDate: "",
                dateOfBirth: "",
                ptBr: {
                    night: 'Nacht',
                    nights: 'Nächte',
                    'check-in': 'check-in',
                    'check-out': 'check-out',
                    'day-names': ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                    'month-names': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .white-background {
        background-color: #FFF !important;
    }
</style>