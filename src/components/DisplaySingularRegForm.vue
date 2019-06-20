<template>

    <Layout>
        <b-container>
            <Title :name="title"></Title>

            <div id="ankunft">
                <p>{{ form.arrivalDate }}</p>
                {{moment(form.arrivalDate).locale('de').calendar()}}
            </div>
        </b-container>
    </Layout>
</template>

<script>

    import FormData from '../assets/sampleRegistrationForm';
    import Layout from "./utils/StandardLayout";
    import Title from "./utils/Title";


    export default {
        name: "singularRegForm",
        components: {Title, Layout},
        data() {
            return {
                form: null,
                title: null
            }
        },
        mounted() {
            this.form = FormData,
            this.title = "Meldescheinnummer #" +  this.form.registrationNumber

        },
    }
</script>

<style lang="scss" scoped>

    .complete-form {

    }

</style>