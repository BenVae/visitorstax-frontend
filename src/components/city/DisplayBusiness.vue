<template>
    <Layout v-if="propsbusiness!=null">
        <Title :name="title"/>
        <v-container grid-list-lg>
            <v-layout row>
                <v-flex xs12 md6>
                    <v-card elevation="5">
                        <v-card-title>
                            <span class="title">Kontakt</span>
                        </v-card-title>
                        <v-container pt-0>
                            <v-layout row text-center>
                                <v-flex xs12>
                                    Mail: {{propsbusiness.contactEmail}}
                                </v-flex>
                                <v-flex xs12>
                                    Telefon: {{propsbusiness.contactTel}}
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
                <v-flex xs12 md6>
                    <v-card elevation="5">
                        <v-card-title>
                            <span class="title">Anschrift</span>
                        </v-card-title>
                        <v-container pt-0>
                            <v-layout row text-center>
                                <v-flex xs12>
                                    {{propsbusiness.address.streetAndNumber}}
                                </v-flex>
                                <v-flex xs12>
                                    {{propsbusiness.address.zipCode}} {{propsbusiness.address.city}}
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex>
                    <v-card elevation="5">
                        <v-card-title>
                            <span class="title">Objekte</span>
                        </v-card-title>
                        <v-container>
                            <v-layout row text-center>
                                <v-flex xs12 md3
                                        v-for="(object, index) in propsbusiness.businessObjects" :key="index">
                                    <v-card elevation="7" height="100px">
                                        <v-container fill-height>
                                            <v-layout row align-center>
                                                <v-flex>
                                                    Objekt: {{object.address.streetAndNumber}}
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-btn block color="blue-grey"
                   @click="displayBusinessEditor"
                   dark>Betrieb bearbeiten
            </v-btn>
            <v-layout row>
                <v-flex>
                    <v-card elevation="5">
                        <v-card-title pb-0>
                            <span class="title">Letzte Meldescheine</span>
                        </v-card-title>
                        <v-card-title>
                            <v-text-field px-2
                                          v-model="search"
                                          prepend-inner-icon="search"
                                          label="Suche"
                                          hide-details
                            ></v-text-field>
                        </v-card-title>
                        <v-data-table
                                :headers="headers"
                                :items="items"
                                :pagination.sync="pagination"
                                :rows-per-page-items="['']"
                                :search="search"
                        >
                            <template v-slot:items="items">
                                <tr @click="displaySingleRegistrationForm(items.item)">
                                    <td>{{ items.item.meta.registrationNumber }}</td>
                                    <td>{{ items.item.formData.guest.surname }}</td>
                                    <td>{{ items.item.formData.guest.name }}</td>
                                    <td>{{ $moment(items.item.formData.arrivalDate).format('DD.MM.YYYY') }}</td>
                                    <td>{{ $moment(items.item.formData.departureDate).format('DD.MM.YYYY') }}
                                    </td>
                                    <td>{{ items.item.formData.registrationFormType}}</td>
                                    <td>{{ items.item.meta.tax }}</td>
                                </tr>
                            </template>
                            <template v-slot:no-results>
                                <v-alert :value="true" color="error" icon="warning">
                                    Die Suche "{{ search }}" war leider Ergebnislos.
                                </v-alert>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </Layout>
    <Layout v-else>
        <span class="title">Fehler beim Laden des Betriebes</span>
    </Layout>
</template>

<script>
    import Title from "../utils/Title"
    import Layout from "../utils/StandardLayout"

    export default {
        name: "DisplayBusiness",
        components: {Title, Layout},
        props: {
            propsbusiness: Object
        },

        data() {
            return {
                title: null,
                items: null,
                search: '',
                pagination: {rowsPerPage: 8},
                headers: [
                    {
                        text: 'Ms-Nr.',
                        value: 'meta.registrationNumber'
                    },
                    {
                        text: 'Name',
                        value: 'formData.guest.surname'
                    },
                    {
                        text: 'Vorname',
                        value: 'formData.guest.name'
                    },
                    {
                        text: 'Ankunft',
                        value: 'formData.arrivalDate'
                    },
                    {
                        text: 'Abfahrt',
                        value: 'formData.departureDate'
                    },
                    {
                        text: 'Typ',
                        value: 'formData.registrationFormType'
                    },
                    {
                        text: 'Kurtaxe in €',
                        value: 'meta.tax'
                    }
                ]
            }
        },

        beforeMount() {
            if(typeof this.propsbusiness != "undefined") {
                this.title = "Betrieb von " + this.propsbusiness.contactPersonName + " " + this.propsbusiness.contactPersonSurname
                this.items = this.getForms()
            }
        },

        methods: {
            getForms() {
                var items = this.$store.getters.registrationForms;

                console.log(items)

                if (this.$store.getters.role === 'city') {
                   items = items.filter(item => item.meta.state === "submitted")
                }

                console.log(items)

                console.log("businessid: " + this.propsbusiness.businessId);


                items = items.filter(form =>
                    parseInt(form.meta.businessObject.business.id) === parseInt(this.propsbusiness.businessId)
                );
                console.log(items)

                return items
            },
            displaySingleRegistrationForm(itemProp) {
                this.$router.push({name: 'Meldeschein', params: {form: itemProp}})
            },
            displayBusinessEditor(){
                this.$router.push({name: 'EditBusiness', params: {businessProp: this.propsbusiness}})
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>