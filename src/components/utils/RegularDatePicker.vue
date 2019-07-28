<template>
    <v-menu
            v-model="menu"
            :close-on-content-click="false"
            full-width
            max-width="290"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    :value="customFormatter"
                    :label="name"
                    prepend-inner-icon="event"
                    readonly
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
                v-model="date"
                color="red lighten-1"
                @change="save"
        ></v-date-picker>
    </v-menu>
</template>

<script>
    export default {
        props: ['value', 'name'],
        data() {
            return {
                date: this.value,
                menu: false
            }
        },
        computed: {
            customFormatter: function () {
                if (this.date === null){
                    return null;
                }
                return this.$moment(this.date).format('DD.MM.YYYY');
            },
        },
        methods: {
            save (date) {
                this.menu = false;
                // this.$refs.menu.save(date);
                this.$emit('input', date);
            },
        },
    }
</script>

<style scoped>

</style>