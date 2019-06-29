<!-- Assuming you have installed as plugin -->
<!-- If you wanna use it in components,
     please import necessary files as shown above -->
<template>
    <v-app>
        <v-container>
            <v-card>
                <v-card-text>
                    <VDaterange/>
                </v-card-text>
            </v-card>
        </v-container>
    </v-app>
</template>
<script>
    import { VDaterange } from "vuetify-daterange-picker"
    import "vuetify-daterange-picker/dist/vuetify-daterange-picker.css";
    export default {
        components: { VDaterange },
        data() {
            return {
                range: {}
            }
        }
    }
</script>