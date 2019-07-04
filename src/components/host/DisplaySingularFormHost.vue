<template>
    <Layout>
        <Title :name="title"/>
        <SingularRegForm/>
    </Layout>
</template>

<script>
    import Layout from "../utils/StandardLayout";
    import Title from "../utils/Title";
    import SingularRegForm from "../DisplaySingularRegForm";
    import FormData from "../../assets/singleSampleRegistrationForm";


    export default {
        name: "singularRegFormHost",
        components: {SingularRegForm, Title, Layout},

        data() {
            return {
                form: null,
                title: null
            }
        },
        beforeMount() {
            this.form = FormData;
            this.title = "Meldeschein #" + this.form.registrationNumber
        }
    }


</script>

<style lang="scss" scoped>

    .top-buffer {
        margin-top: 10px;
    }

</style>