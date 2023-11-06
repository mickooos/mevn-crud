<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const __api = `${import.meta.env.VITE_API_URL}/v1/user/logout`
const router = useRouter()
const store = useStore()
const logOut = () => {
  try {
    axios
      .delete(__api, {
        withCredentials: true
      })
      .then((res) => {
        store.commit('setAuthentication', false)
        router.push({ name: 'signin' })
        console.log(res.data.message)
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <nav class="navbar">
      <a href="#" class="navbar-logo">mevn<span>CRUD.</span></a>
      <div class="navbar-nav">
        <button class="exit-route" @click="logOut()">
          <i class="bi bi-box-arrow-in-right"></i>
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
div:first-child {
  --primary: #53a86c;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 7%;
  background-color: rgba(1, 1, 1, 0.8);
  border-bottom: 1px solid #272727;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
.navbar .navbar-logo {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}
.navbar .navbar-logo span {
  color: var(--primary);
}
.navbar .navbar-nav .exit-route {
  color: #fff;
  background: none;
  margin: 0 0.5rem;
  font-size: 1.5rem;
}
.navbar .navbar-nav .exit-route:hover {
  color: var(--primary);
}

/* Mobile Phone */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  .navbar .navbar-nav .exit-route {
    font-size: 1.8rem;
  }
}
</style>
