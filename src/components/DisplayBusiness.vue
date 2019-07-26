<template>
    <Layout>
        <Title :name="title"/>
        <v-container grid-list-lg>
            <v-layout row>
                <v-flex xs12 md6>
                    <v-card>
                        <v-card-title>
                            <span class="title">Kontakt</span>
                        </v-card-title>
                        <v-container pt-0>
                            <v-layout row text-center>
                                <v-flex xs12>
                                    Mail: {{business.contactEmail}}
                                </v-flex>
                                <v-flex xs12>
                                    Telefon: {{business.contactTel}}
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
                <v-flex xs12 md6>
                    <v-card>
                        <v-card-title>
                            <span class="title">Anschrift</span>
                        </v-card-title>
                        <v-container pt-0>
                            <v-layout row text-center>
                                <v-flex xs12>
                                    {{business.adress.streetAndNumber}}
                                </v-flex>
                                <v-flex xs12>
                                    {{business.adress.zipCode}} {{business.adress.city}}
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex>
                    <v-card>
                        <v-card-title>
                            <span class="title">Objekte</span>
                        </v-card-title>
                        <v-container>
                            <v-layout row text-center>
                                <v-flex xs12 md3
                                        v-for="object in business.businessObjects">
                                    <v-card elevation="3" height="100px">
                                        <v-container fill-height>
                                            <v-layout row align-center>
                                                <v-flex>
                                                    Objekt: {{object.adress.streetAndNumber}}
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
            <v-layout row>
                <v-flex>
                    <v-card>
                        <v-card-title>
                            <span class="title">Letzte Meldescheine</span>
                        </v-card-title>

                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </Layout>
</template>

<script>
    import Title from "./utils/Title"
    import Layout from "./utils/StandardLayout"
    import Business from "../assets/businessData"
    import FormData from "../assets/sampleRegistrationForm";

    export default {
        name: "DisplayBusiness",
        components: {Title, Layout},

        data() {
            return {
                business: null,
                title: null,
                forms: null
            }
        },

        beforeMount() {
            this.business = Business[0]
            this.title = "Betrieb von " + this.business.contactPersonName + " " + this.business.contactPersonSurname
            this.forms = this.getForms()
        },

        methods:{
            getForms(){
                return FormData.filter(function (el) {
                    return el.business.id = "1";
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>