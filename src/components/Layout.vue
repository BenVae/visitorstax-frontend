<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col mt-4 rounded-lg" id="menu">
                    <router-view/>
                </div>
            </div>
        </div>
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