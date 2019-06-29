<template>
    <div class="row-with-description">
        <b-row>
            <b-col>
                <small>{{name}}</small>
            </b-col>
            <b-col class="text-right" v-if="isInUse">
                <CloseIcon class="icon-2x"/>
            </b-col>
        </b-row>
        <b-row class="mb-2 justify-content-md-center">
            <slot/>
        </b-row>
    </div>

</template>

<script>
    import CloseIcon from "vue-material-design-icons/Close";

    export default {
        name: "RowWithDescription",
        components: {CloseIcon},
        props: {
            name: String,
            isInUse: Boolean
        }
    }
</script>

<style>
    .row-with-description {
        border-top: 1px solid darkgray;
    }

    .material-design-icon.icon-2x {
        height: 1.5em;
        width: 1.5em;
    }

    .material-design-icon.icon-2x > .material-design-icon__svg {
        height: 1.5em;
        width: 1.5em;
    }
</style>