<template>
    <div>

        <h1>{{ form.registrationNumber }}</h1>

    </div>
</template>

<script>

    import FormData from '../assets/sampleRegistrationForm';

    export default {
        name: "Singularregform",
        data(){
            return {
                form: null
            }
        },
        mounted() {
            this.form = FormData
        }
    }
</script>