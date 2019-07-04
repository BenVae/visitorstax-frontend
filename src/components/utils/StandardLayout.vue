<template>
    <v-container>
        <v-layout row>
            <v-flex mt-5 rounded-lg id="menu" class="layout-flow">
                <v-container>
                    <slot/>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "StandardLayout"
    }
</script>
<style lang="scss" scoped>
    #menu {
        background: rgba(255, 255, 255, 0.9);
        min-height: 80vh;
    }
    .layout-flow{
        overflow: auto;
    }
</style>