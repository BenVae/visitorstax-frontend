<template>
    <Layout>
        <Title name="Meldeschein anlegen"/>
        <v-form ref="form">
            <v-container>
                <v-layout row justify-center>
                    <v-flex sm6 md3>
                        <v-select
                                v-model="business.type"
                                :items="types"
                                label="Art"
                        ></v-select>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-text-field
                                v-model="business.businessName"
                                :rules="[v => !!v || 'Bitte Betriebsname eingeben']"
                                label="Name des Betriebs"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-text-field
                                v-model="business.user.username"
                                :rules="[v => !!v || 'Bitte Betriebsnummer eingeben']"
                                label="Betriebsnummer"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center>
                    <v-flex sm6 md3>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Straße/Hausnummer eingeben']"
                                v-model="business.address.streetAndNumber"
                                label="Straße/Hausnummer">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Postleihzahl eingeben']"
                                v-model="business.address.zipCode"
                                label="Postleizahl">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm4 md2>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Wohnort eingeben']"
                                v-model="business.address.city"
                                label="Wohnort">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
            <row-with-description name="Kontaktperson">
                <v-layout row justify-center>
                    <v-flex sm6 md3>
                        <v-text-field
                                v-model="business.contactPersonName"
                                :rules="[v => !!v || 'Bitte Vorname eingeben']"
                                label="Vorname (nur Rufname)">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-text-field
                                v-model="business.contactPersonSurname"
                                :rules="[v => !!v || 'Bitte Familienname eingeben']"
                                label="Familienname">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte E-mail Adresse eingeben']"
                                v-model="business.contactEmail"
                                label="E-Mail">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Telefonnummer eingeben']"
                                v-model="business.contactTel"
                                label="Telefonnummer">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </row-with-description>
            <row-with-description name="Mietobjekte">
                <v-layout row justify-center>
                    <v-flex sm6 md3>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Straße/Hausnummer eingeben']"
                                v-model="address.streetAndNumber"
                                label="Straße/Hausnummer">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-select
                                v-model="address.zipCode"
                                :items="zipCodes"
                                label="Postleitzahl"
                                append-outer-icon="add_circle"
                                @click:append-outer="createBusinessObject"
                        ></v-select>
                    </v-flex>
                </v-layout>
            </row-with-description>
        </v-form>
    </Layout>
</template>

<script>
    import Layout from "../utils/StandardLayout";
    import Title from "../utils/Title";
    import RowWithDescription from "../utils/RowWithDescription";

    export default {
        name: "CreateBusiness",
        components: {Title, Layout, RowWithDescription},
        methods: {
            createBusinessObject(){
                if (this.address.zipCode !== ""){
                    this.business.businessObjects;
                }
            }
        },
        data() {
            return {
                types: ["Privat", "Hotel"],
                zipCodes: ["78462", "78464", "78465", "78467"],
                address: {
                    streetAndNumber: "",
                    zipCode: "78462",
                    city: "Konstanz",
                    country: "Germany"
                },
                business: {
                    businessName: "",
                    type: "Privat",
                    user: {
                        username: "",
                        password: "123456",
                        role: "landlord"
                    },
                    address: {
                        streetAndNumber: "",
                        zipCode: "",
                        city: "",
                        country: ""
                    },
                    businessObjects: [],
                    contactPersonName: "",
                    contactPersonSurname: "",
                    contactEmail: "",
                    contactTel: ""
                }
            }
        }

    }
</script>

<style scoped>

</style>