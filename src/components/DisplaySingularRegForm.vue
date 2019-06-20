<template>

    <Layout>
        <h1>{{ form.registrationNumber }}</h1>
    </Layout>
</template>

<script>


    import FormData from '../assets/sampleRegistrationForm';
    import Layout from "./StandardLayout";

    export default {
        name: "singularRegForm",
        components: {Layout},
        data() {
            return {
                form: null
            }
        },
        mounted() {
            this.form = FormData
        }
    }
</script>