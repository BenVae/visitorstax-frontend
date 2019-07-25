<template>
   <Layout>
       <Title name="Startseite"/>
   </Layout>
</template>

<script>
    import Layout from "./utils/StandardLayout";
    import Title from "./utils/Title";
    export default {
        name: "Test",
        components: {Title, Layout}
    }
</script>

<style scoped>
</style>