<template>
    <standard-layout>
        <Title name="Disclaimer"></Title>
        <v-container grid-list-lg>
            <v-layout row text-center class="mt-3">
                <v-flex class="title font-weight-regular">
                    <div class="py-3 px-2">
                        Bei diesem Projekt handelt es sich um einen <span class="emph">Prototypen</span>
                        zur Digitalisierung des Meldescheinprozesses der Stadt Konstanz.
                    </div>
                    <div class="py-3 px-2">
                        Das Projekt wurde von Studenten der <span class="font-italic">Hochschule für Technik, Wirtschaft und Gestaltung
                                Konstanz</span> in Zusammenarbeit mit der Stadtverwaltung realisiert.
                    </div>
                    <div class="py-3 px-2">
                        Alle Funktionalitäten, die diese Webapplikation bereitstellt, dienen ausschließlich der
                        Präsentation des Proof of Concept und sollten in ihrer Form nicht für andere
                        Zwecke verwandt werden.
                    </div>
                </v-flex>
            </v-layout>
            <v-layout row align-center justify-space-around class="mt-3">
                <v-flex xs12 md4>
                    <img style="max-width: 100%"
                         src="../assets/exampleData/Constance_logo.png"
                         alt="Konstanz Logo">
                </v-flex>
                <v-flex xs12 md4>
                    <img style="max-width: 100%"
                         src="../assets/images/htwg_logo.png"
                         alt="HTWG Logo">
                </v-flex>
            </v-layout>
        </v-container>
    </standard-layout>
</template>

<script>
    import Title from "./utils/Title";
    import StandardLayout from "./utils/Layout";

    export default {
        name: "index",
        components: {StandardLayout, Title}
    }
</script>

<style scoped>
    .emph {
        color: #E40521
    }
</style>