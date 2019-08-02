<template>
    <v-container pt-0>
        <v-layout row pt-0 class="row-with-description">
            <v-flex pa-0>
                <small>{{name}}</small>
            </v-flex>
            <v-flex pa-0 text-sm-right v-if="closable">
                <close-icon
                        class="show-pointer"
                        v-on:click="toggleButtonVisibility">
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
            closable: Boolean
        },
        methods: {
            toggleButtonVisibility() {
                this.$emit('destroyCloseIcon');
            }
        }
    }
</script>

<style>
    .row-with-description {
        border-top: 1px solid darkgray;
    }
</style>