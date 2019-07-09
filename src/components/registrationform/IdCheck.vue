<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6 lg4>
                <v-card rounded-lg>
                    <v-card-text>
                        <v-form>
                            <v-container pb-0>
                                <v-layout row justify-center>
                                    <v-flex sm10>
                                        <v-checkbox
                                                v-model="documentChecked"
                                                label="Identitätsdukument von ausländischen Gästen wurde vorgelegt und die Angaben verglichen"></v-checkbox>
                                    </v-flex>
                                </v-layout>
                                <v-layout row justify-center>
                                    <v-flex sm10>
                                        <v-checkbox
                                                v-model="deviationsExisting"
                                                label="Abweichungen vorhanden">
                                            <v-tooltip slot="append" bottom>
                                                <v-icon slot="activator" color="grey" dark>info</v-icon>
                                                <span>Irgendeine Info</span>
                                            </v-tooltip>
                                        </v-checkbox>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="blue-grey" dark>zurück</v-btn>
                        <v-spacer/>
                        <v-btn color="blue-grey" dark>speichern</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "IdCheck",
        data: () => ({
            documentChecked: false,
            deviationsExisting: false
        }),
    }
</script>

<style lang="scss">

    .btn_login_custom {
        border: none !important;
    }

    .v-btn.btn_login_custom:hover,
    .v-btn.btn_login_custom:active,
    .v-btn.btn_login_custom:focus {
        background-color: #EF5350 !important;
    }

    .card-title-custom-login {
        margin-bottom: 8%;
        border-bottom: 3px solid #E40521;
    }

</style>