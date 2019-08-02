<template>
    <Layout>
        <Title name="Rechnung erstellen"/>
        <v-form ref="form">
            <v-container>
                <v-layout row justify-center>
                    <v-flex sm6 md3>
                        <v-select
                                :items="businesses"
                                label="Betriebe"
                                v-on:input="businessChanged"
                        ></v-select>
                    </v-flex>
                </v-layout>
                <v-layout row justify-center pb-4>
                    <v-btn
                            id="printPdfButton"
                            style="display: none"
                            @click="downloadPDF"
                            color="blue-grey"
                            dark>PDF herunteladen
                    </v-btn>
                </v-layout>
                <iframe id='pdfV' style="width:100%; height: 700px;" frameborder="0" scrolling="no"></iframe>
            </v-container>
        </v-form>
    </Layout>
</template>

<script>
    import Layout from "../utils/Layout";
    import Title from "../utils/Title";
    import {createpdf, downloadPDF, getBusinesses} from "../../services/invoiceService";

    export default {
        name: "CreateInvoice",

        data() {
            return {
                businesses: [],
                businessId: "",
            }
        },
        components: {Title, Layout},
        methods: {
            businessChanged(businessids) {
                this.businessId = businessids;
                document.getElementById("printPdfButton").style.display = 'block';
                createpdf(businessids);

            },
            downloadPDF() {
                downloadPDF();
            }
        },
        beforeMount() {
            this.businesses = getBusinesses();
            let registrationForms = [];
            this.$store.getters.registrationForms.forEach(function (element) {
                if (element.meta.state === "submitted") {
                    registrationForms.push(element.meta.businessObject.business.id)
                }
            });
            this.businesses = this.businesses.filter(function (element) {
                if (registrationForms.includes(parseInt(element.value))) {
                    return element
                }
            });
        },

    }
</script>