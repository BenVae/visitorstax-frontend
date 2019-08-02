<template>
    <Layout>
        <Title name="Betrieb anlegen"/>
        <v-form ref="form">
            <v-container>
                <v-layout justify-center row>
                    <v-flex md3 sm6>
                        <v-select
                                :items="types"
                                label="Art"
                                v-model="business.type"
                        ></v-select>
                    </v-flex>
                    <v-flex md3 sm6>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Betriebsname eingeben']"
                                label="Name des Betriebs"
                                v-model="business.businessName"
                        >
                        </v-text-field>
                    </v-flex>
                    <v-flex md3 sm6>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Betriebsnummer eingeben']"
                                label="Betriebsnummer"
                                v-model="business.user.username"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout justify-center row>
                    <v-flex md3 sm6>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Straße/Hausnummer eingeben']"
                                label="Straße/Hausnummer"
                                v-model="business.address.streetAndNumber">
                        </v-text-field>
                    </v-flex>
                    <v-flex md2 sm4>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Postleihzahl eingeben']"
                                label="Postleizahl"
                                v-model="business.address.zipCode">
                        </v-text-field>
                    </v-flex>
                    <v-flex md2 sm4>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Wohnort eingeben']"
                                label="Wohnort"
                                v-model="business.address.city">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
            <row-with-description name="Kontaktperson">
                <v-layout justify-center row>
                    <v-flex md3 sm6>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Vorname eingeben']"
                                label="Vorname (nur Rufname)"
                                v-model="business.contactPersonName">
                        </v-text-field>
                    </v-flex>
                    <v-flex md3 sm6>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Familienname eingeben']"
                                label="Familienname"
                                v-model="business.contactPersonSurname">
                        </v-text-field>
                    </v-flex>
                    <v-flex md3 sm6>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte E-mail Adresse eingeben']"
                                label="E-Mail"
                                v-model="business.contactEmail">
                        </v-text-field>
                    </v-flex>
                    <v-flex md3 sm6>
                        <v-text-field
                                :rules="[v => !!v || 'Bitte Telefonnummer eingeben']"
                                label="Telefonnummer"
                                v-model="business.contactTel">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </row-with-description>
            <row-with-description name="Mietobjekte">
                <v-layout justify-center row>
                    <v-flex md3 sm6>
                        <v-text-field
                                label="Straße/Hausnummer"
                                v-model="businessObject.address.streetAndNumber">
                        </v-text-field>
                    </v-flex>
                    <v-flex md3 sm6>
                        <v-select
                                :items="zipCodes"
                                @click:append-outer="createBusinessObject"
                                append-outer-icon="add_circle"
                                label="Postleitzahl"
                                v-model="businessObject.address.zipCode"
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
                                        <v-flex :key="index" md3
                                                v-for="(object,index) in business.businessObjects" xs12>
                                            <v-card elevation="7" height="100px">
                                                <v-container fill-height>
                                                    <v-layout align-center row>
                                                        <v-flex>
                                                            {{object.address.streetAndNumber}}<br>{{object.address.zipCode}}
                                                        </v-flex>
                                                    </v-layout>
                                                    <close-icon
                                                            :size="16"
                                                            class="show-pointer"
                                                            fill-color="#607D8B"
                                                            v-on:click="deleteObject(index)">
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
                        dark>weiter
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
    import {createBusiness} from "../../services/businessService";

    export default {
        name: "CreateBusiness",
        components: {CloseIcon, Title, Layout, RowWithDescription},
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
                    alert("Straße/Hausnummer feld darf nicht leer sein")
                }
            },
            deleteObject(index) {
                this.business.businessObjects.splice(index, 1);
            },
            submitForm() {
                if (this.$refs.form.validate()) {
                    createBusiness(this.business);
                    this.$router.push({name: 'Betriebe'})
                }
            }
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
                business: {
                    businessId: "",
                    businessName: "",
                    type: "Privat",
                    user: {
                        id: "",
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
