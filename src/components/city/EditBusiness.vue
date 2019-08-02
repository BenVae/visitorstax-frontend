<template>
    <Layout>
        <Title name="Betrieb bearbeiten"/>
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
                                v-model="businessObject.address.streetAndNumber"
                                label="Straße/Hausnummer">
                        </v-text-field>
                    </v-flex>
                    <v-flex sm6 md3>
                        <v-select
                                v-model="businessObject.address.zipCode"
                                :items="zipCodes"
                                label="Postleitzahl"
                                append-outer-icon="add_circle"
                                @click:append-outer="createBusinessObject"
                        ></v-select>
                    </v-flex>
                </v-layout>
                <v-container grid-list-lg>
                    <v-layout row>
                        <v-flex>
                            <v-card elevation="5">
                                <v-card-title>
                                    <span class="title">Objekte</span>
                                </v-card-title>
                                <v-container>
                                    <v-layout row text-center>
                                        <v-flex xs12 md3
                                                v-for="(object,index) in business.businessObjects" :key="index">
                                            <v-card elevation="7" height="100px">
                                                <v-container fill-height>
                                                    <v-layout row align-center>
                                                        <v-flex>
                                                            {{object.address.streetAndNumber}}<br>{{object.address.zipCode}}
                                                        </v-flex>
                                                    </v-layout>
                                                    <close-icon
                                                            class="show-pointer"
                                                            v-on:click="deleteObject(index)"
                                                            :size="16"
                                                            fill-color="#607D8B">
                                                    </close-icon>
                                                </v-container>
                                            </v-card>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </row-with-description>
            <v-layout align-end justify-end>
                <v-btn
                        @click="submitForm"
                        color="blue-grey"
                        dark>speichern
                </v-btn>
            </v-layout>
        </v-form>
    </Layout>
</template>

<script>
    import Layout from "../utils/Layout";
    import Title from "../utils/Title";
    import RowWithDescription from "../utils/RowWithDescription";
    import CloseIcon from "vue-material-design-icons/Close";
    import {updateBusiness} from "../../services/businessService";

    export default {
        name: "CreateBusiness",
        components: {CloseIcon, Title, Layout, RowWithDescription},
        props: {
            businessProp: Object
        },
        data() {
            return {
                types: ["Privat", "Hotel"],
                zipCodes: ["78462", "78464", "78465", "78467"],
                businessObject: {
                    id: "",
                    address: {
                        streetAndNumber: "",
                        zipCode: "78462",
                        city: "Konstanz",
                        country: "Germany"
                    }
                },
                business: {}
            }
        },
        beforeMount() {
            this.business = this.businessProp;
        },
        methods: {
            createBusinessObject() {
                if (this.businessObject.address.streetAndNumber !== "") {
                    this.business.businessObjects.push({
                        id: this.business.businessObjects.length + 1,
                        address: {
                            streetAndNumber: this.businessObject.address.streetAndNumber,
                            zipCode: this.businessObject.address.zipCode,
                            city: "Konstanz",
                            country: "Germany"
                        }
                    });
                    this.businessObject.address.streetAndNumber = "";
                } else {
                    alert("Straße/Hausnummer Feld darf nicht leer sein")
                }
            },
            deleteObject(index) {
                this.business.businessObjects.splice(index, 1);
            },
            submitForm() {
                if (this.$refs.form.validate()) {
                    updateBusiness(this.business);
                    this.$router.push({name: 'Betriebe'})
                }
            }
        }
    }
</script>