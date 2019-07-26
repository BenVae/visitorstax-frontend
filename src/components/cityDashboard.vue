<template>
    <Layout>
        <Title name="Dash"></Title>
        <v-container grid-list-lg>
            <v-layout>
                <v-flex xs12 md6>
                    <v-card>1</v-card>
                </v-flex>
                <v-flex xs12 md6>
                    <v-card>2</v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </Layout>
</template>

<script>
    import Layout from "./utils/StandardLayout";
    import Title from "./utils/Title"

    export default {
        name: "cityDashboard",
        components: {Layout, Title}
    }
</script>

<style scoped>

</style>