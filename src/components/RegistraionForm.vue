<template>
    <Layout>
        <Title name="Meldeschein anlegen"/>
        <b-row class="pt-3">
            <b-col md="3" sm="6">
                <b-form-group>
                    <label for="registrationFormType">Art</label>
                    <select class="form-control form-control-sm" id="registrationFormType">
                        <option>Regulär</option>
                        <option>Gruppe</option>
                    </select>
                </b-form-group>
            </b-col>
            <b-col md="3" sm="6">
                <b-form-group>
                    <label for="arrivalDate">Ankunft</label>
                    <input type="date" class="form-control form-control-sm" id="arrivalDate">
                </b-form-group>
            </b-col>
            <b-col md="3" sm="6">
                <b-form-group>
                    <label for="departureDate">Ankunft</label>
                    <input type="date" class="form-control form-control-sm" id="departureDate">
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
                    <label for="dateOfBirth">Geburtsdatum</label>
                    <input type="date" class="form-control form-control-sm" id="dateOfBirth">
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
                    <label>Nationalität</label>
                    <datepicker input-class="form-control form-control-sm"></datepicker>
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


    export default {
        name: "RegistrationForm",
        components: {RowWithDescription, Title, Layout, Datepicker},
    }
</script>

<style lang="scss" scoped>

</style>