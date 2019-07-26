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
            if(typeof this.form != "undefined") {
                this.title = "Meldeschein #" + this.form.meta.registrationNumber
            }else {
                this.title = "Fehler"
            }
        }
    }


</script>
