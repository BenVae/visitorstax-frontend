<template>
    <h1 class="text-center my-3">
        <span class="title-border-bottom">{{name}}</span>
    </h1>
</template>

<script>
    export default {
        name: "Title",
        props: ['name']
    }
</script>

<style scoped>
    .title-border-bottom{
        border-bottom: 3px solid #E40521;
        padding: 2px 16px;
    }
</style>