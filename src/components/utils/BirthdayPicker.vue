<template>
    <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="customFormatter"
                    label="Geburtsdatum"
                    prepend-inner-icon="event"
                    readonly
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
                ref="picker"
                v-model="date"
                :max="new Date().toISOString().substr(0, 10)"
                min="1920-01-01"
                color="red lighten-1"
                @change="save"
        ></v-date-picker>
    </v-menu>
</template>

<script>
    export default {
        props: ['value'],
        data() {
            return {
                date: this.value,
                menu: false
            }
        },
        watch: {
            menu(val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            }
        },
        computed: {
            customFormatter: {
                get: function () {
                    if (this.date == null) return null;
                    return this.$moment(this.date).format('DD.MM.YYYY')
                },
                set: function () {
                }
            },
        },
        methods: {
            save(date) {
                this.$refs.menu.save(date);
                this.$emit('input', date);
            },
        },
    }
</script>

<style scoped>

</style>