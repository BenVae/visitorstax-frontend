<template>
    <v-container pt-0>
        <v-layout row pt-0 class="row-with-description">
            <v-flex pa-0>
                <small>{{name}}</small>
            </v-flex>
            <v-flex pa-0 text-sm-right v-if="hasSpouse">
                <close-icon
                        v-on:click="toggleSpouseBoolean">
                </close-icon>
            </v-flex>
        </v-layout>
        <slot/>
    </v-container>
</template>

<script>

    import CloseIcon from "vue-material-design-icons/Close";

    export default {
        name: "RowWithDescription",
        components: {CloseIcon},
        props: {
            name: String,
            hasSpouse: Boolean
        },
        methods: {
            toggleSpouseBoolean() {
                this.$emit('updateSpouse');
            }
        }
    }
</script>

<style>
    .row-with-description {
        border-top: 1px solid darkgray;
    }

    .orders-layout {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 50%;
        overflow: auto;
    }
</style>