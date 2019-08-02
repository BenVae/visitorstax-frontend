<template>
    <v-container>
        <v-layout row fill-height>
            <v-flex rounded-lg id="menu">
                <v-container
                        class="content"
                        :class="{'px-5': $vuetify.breakpoint.mdAndUp}">
                    <slot/>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "StandardLayout",
    }
</script>
<style lang="scss" scoped>
    #menu {
        display: flex;
        background: rgba(255, 255, 255, 0.9);
        min-height: 80vh;
        position: relative;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .content {
        box-sizing: border-box;
        width: 100%;
        position: absolute;
    }

    ::-webkit-scrollbar {
        width: 0.6em;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
    }

    ::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: gray;
    }

</style>