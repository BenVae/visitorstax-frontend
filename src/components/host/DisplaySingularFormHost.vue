<template>
    <Layout>
        <Title :name="title"/>
        <SingularRegForm :propform="form"/>
    </Layout>
</template>

<script>
    import Layout from "../utils/StandardLayout";
    import Title from "../utils/Title";
    import SingularRegForm from "../DisplaySingularRegForm";


    export default {
        name: "singularRegFormHost",
        components: {SingularRegForm, Title, Layout},
        props: {
          form: Object
        },

        data() {
            return {
                title: null
            }
        },
        beforeMount() {
            this.title = "Meldeschein #" + this.form.registrationNumber
        }
    }


</script>

<style lang="scss" scoped>

    .top-buffer {
        margin-top: 10px;
    }

</style>