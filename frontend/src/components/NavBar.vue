<template>
    <nav class="navbar navbar-expand-lg navbar-dark shadow-sm fixed-top">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <img src="../assets/images/logo.png" class="app-logo">
          <label>MEVN-CRUD</label>
        </router-link>
      </div>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
};
</script>

<style>
.navbar .container .navbar-brand .app-logo {
    width: 12.6%;
    height: 12.6%;
    border-radius: 50%;
    margin-top: -5px;
}

.navbar .container .navbar-brand label {
    margin-left: 0.5rem;
    font-size: 1.5rem;
}

/* Media Queries */

/* Tablet */
@media (max-width: 1000px) {

    .navbar .container .navbar-brand .app-logo {
        width: 10.8%;
        height: 10.8%;
        margin-top: -13px;
    }

    .navbar .container .navbar-brand label {
        margin-left: 1rem;
        font-size: 3rem;
    }
}

/* Mobile Phone */
@media (max-width: 500px) {

    .navbar .container .navbar-brand .app-logo {
        width: 11.6%;
        height: 11.6%;
        margin-top: -10px;
    }

    .navbar .container .navbar-brand label {
        margin-left: 1rem;
        font-size: 2.3rem;
    }
    
}


</style>