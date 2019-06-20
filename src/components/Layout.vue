<template>
    <div>
        <div id="image"></div>
        <b-container>
            <b-row>
                <b-col class="mt-5 rounded-lg" id="menu">
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name: "Layout"
    }
</script>
<style lang="scss" scoped>
    #menu {
        background: rgba(255, 255, 255, 0.9);
        min-height: 80vh;
    }
</style>