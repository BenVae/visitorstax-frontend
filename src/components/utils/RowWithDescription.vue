<template>
    <div class="row-with-description">
        <p>
            <small>{{name}}</small>
        </p>
        <b-row class="mb-2 justify-content-md-center">
            <slot/>
        </b-row>
    </div>

</template>

<script>
    export default {
        name: "RowWithDescription",
        props: ['name']
    }
</script>

<style scoped>
    .row-with-description {
        border-top: 1px solid darkgray;
    }
</style>