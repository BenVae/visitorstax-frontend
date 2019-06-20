<template>
    <div>
        <b-container>
            <b-row>
                <b-col class="mt-5 rounded-lg" id="menu">
                    <slot/>
                </b-col>
            </b-row>
        </b-container>
    </div>
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
</style>