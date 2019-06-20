<template>
    <div class="container h-100">
        <div class="row justify-content-center h-100">
            <div class="col-md-6 align-self-center">
                <div class="card card-login-custom">
                    <form class="m-0" name="loginForm">
                        <div class="card-body">
                            <h3 class="card-title text-center card-title-custom-login">Betriebs Login</h3>
                            <div class="form-group text-left">
                                <label class="label-login" for="betriebsnummer">Betriebsnummer</label>
                                <input type="text" class="form-control text-center input-login" name="betriebsnummer"
                                       id="betriebsnummer" placeholder="Betriebsnummer" autofocus required>
                            </div>
                            <div class="form-group text-left">
                                <label class="label-login" for="password">Passwort</label>
                                <input type="password" class="form-control text-center input-login" name="password"
                                       id="password" placeholder="Passwort" required>
                            </div>
                            <button type="submit" class="btn btn-secondary btn-block btn_login_custom">login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style lang="scss">

    .card-login-custom {
        border-radius: 15px !important;
    }

    .btn_login_custom{
        border: none !important;
    }

    .btn.btn-secondary.btn-block.btn_login_custom:hover,
    .btn.btn-secondary.btn-block.btn_login_custom:active,
    .btn.btn-secondary.btn-block.btn_login_custom:focus {
        background-color: red;
    }

    .label-login {
        font-size: 20px;
    }

    .input-login:focus {
        box-shadow: 0 0 0 0.2rem rgba(255, 0, 17, 0.25) !important;
        border-color: lightgrey!important;
    }

    .card-title-custom-login {
        margin-bottom: 8%;
        border-bottom: 3px solid red;
    }

</style>