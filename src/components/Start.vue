<template>
    <Layout>
        <Title name="Startseite"/>
        <v-container grid-list-lg
                     v-if="this.$store.getters.role == 'city'">
            <v-layout>
                <v-flex xs12 md6>
                    <v-card>1</v-card>
                </v-flex>
                <v-flex xs12 md6>
                    <v-card>2</v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container v-else-if="this.$store.getters.role == 'landlord'">
            tis a vermieter
        </v-container>
    </Layout>
</template>

<script>
    import Layout from "./utils/StandardLayout";
    import Title from "./utils/Title";

    export default {
        name: "Start",
        components: {Title, Layout}
    }
</script>

<style scoped>
</style>