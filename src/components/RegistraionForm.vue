<template>
    <Layout>
        <div>
            <h1 class="text-center my-3">
                <span class="title-boarder-bottom">Meldeschein Anlegen</span>
            </h1>
        </div>
    </Layout>
</template>

<script>
    import Layout from "./StandardLayout";
    export default {
        name: "RegistrationForm",
        components: {Layout}
    }
</script>

<style lang="scss" scoped>

    .title-boarder-bottom{
        border-bottom: 3px solid red;
        padding: 0 16px;
    }
</style>