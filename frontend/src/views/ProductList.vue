<template>
  <div>
    <body>
      <section class="product">
        <h2>Product <span>List</span></h2>
        <div class="user">
          <h5>Selamat Datang, {{ user }}</h5>
        </div>
        <div><input type="text" class="search-box" v-model="search" placeholder="Search" /></div>
        <RouterLink to="/add" class="add-route">Tambah Produk</RouterLink>

        <div v-if="productsFilter.length">
          <div class="wrapper">
            <div class="row">
              <div class="card" v-for="(p, index) in productsFilter" :key="index">
                <div class="card-img">
                  <img :src="getImage(p.image)" />
                </div>
                <div class="card-content">
                  <div class="card-text">
                    <h3>{{ p.name }}</h3>
                    <p>Rp. {{ p.price }}</p>
                    <p>{{ p.categories }}</p>
                  </div>
                  <div class="card-desc">
                    <p>{{ p.desc }}</p>
                  </div>
                </div>
                <RouterLink :to="{ name: 'edit', params: { id: p.productId } }" class="edit-route"
                  >Edit Produk</RouterLink
                >
                <a class="delete" @click="deleteProduct(p.productId)">Hapus Produk</a>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="data-not-found">Sorry, Data Not Found :(</p>
        </div>
      </section>
    </body>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'

const user = ref()
const products = ref([])
const search = ref('')

const getUser = async (__api) => {
  try {
    await axios
      .get(__api)
      .then((res) => {
        user.value = res.data.map((item) => item.name).toString()
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  } catch (error) {
    console.log(error)
  }
}
getUser('/v1/user')

const getProducts = async (__api) => {
  try {
    await axios
      .get(__api)
      .then((res) => {
        products.value = res.data.products
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  } catch (error) {
    console.log(error)
  }
}
getProducts('/v2/products')

const getImage = (img) => {
  return new URL(`../uploads/${img}`, import.meta.url).href
}

const deleteProduct = async (id) => {
  try {
    await axios
      .delete(`/v2/product/${id}`)
      .then((res) => {
        console.log(res.data.message)
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  } catch (error) {
    console.log(error)
  }
}

const productsFilter = computed(() => {
  return products.value.filter((item) => {
    return item.name.toLowerCase().includes(search.value.toLowerCase())
  })
})
</script>

<style scoped>
div:first-child {
  --primary: #53a86c;
  --hover: #327747;
  --edit: #2f54cc;
  --editHover: #1c3da7;
  --delete: rgb(160, 20, 20);
  --delHover: rgb(124, 19, 19);
  --sectionBg: #f7f6f9;
}

body {
  color: #fff;
}

.product {
  padding: 7rem 7% 1.4rem;
}
.product .user {
  margin: 1.5rem 0 0 10.5rem;
  font-size: 1.3rem;
}
.product .home-route {
  color: #fff;
  position: fixed;
  top: 1%;
  left: 1%;
}
.product .home-route:hover {
  color: var(--hover);
}
.product h2 {
  text-align: center;
  font-size: 2.6rem;
}
.product h2 span {
  color: var(--primary);
}
.product .search-box {
  display: block;
  width: 440px;
  margin: 1.4rem 0.3em 0.3em 10.5em;
  padding: 10px 45px;
  background: white url('../assets/img/search-icon.png') no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
.product .add-route {
  margin: 1rem 0.3em 0em 13em;
  display: inline-block;
  padding: 1rem 3rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #fff;
  background-color: var(--primary);
  border-radius: 0.5rem;
  box-shadow: 1px 1px 3px rgba(1, 1, 3, 0.5);
}
.product .wrapper {
  padding: 7rem 7% 1.4rem;
}
.product .wrapper .row {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 70%;
  gap: 40px;
  justify-content: center;
}
.product .wrapper .row .card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 20px 40px;
  border-radius: 10px;
  transition: 0.3s;
  width: 450px;
  height: 100%;
  background-color: var(--sectionBg);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  color: black;
}
.product .wrapper .row .card:hover {
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
.product .wrapper .row .card .card-img {
  display: grid;
  place-items: center;
  width: 100%;
  height: 60%;
}
.product .wrapper .row .card .card-img img {
  width: 240px;
}
.product .wrapper .row .card .card-content .card-text {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  width: 100%;
}
.product .wrapper .row .card .card-content .card-text p {
  font-weight: 540;
}
.product .wrapper .row .card .card-content .card-desc p {
  margin-top: 0.5rem;
  font-size: 1em;
  line-height: 25px;
}
.product .wrapper .row .card .edit-route {
  display: inline-block;
  padding: 0.7em 1.4em;
  margin: 2rem 3em 0.3em 3em;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 400;
  background-color: var(--edit);
  color: #fff;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 3px rgba(1, 1, 3, 0.5);
  text-align: center;
  position: relative;
}
.product .wrapper .row .card .edit-route:hover {
  background-color: var(--editHover);
}
.product .wrapper .row .card .delete {
  display: inline-block;
  padding: 0.7em 1.4em;
  margin: 0.3em 3em 0.3em 3em;
  border-radius: 0.15em;
  box-sizing: border-box;
  text-decoration: none;
  font-weight: 400;
  background-color: var(--delete);
  color: #fff;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 3px rgba(1, 1, 3, 0.5);
  text-align: center;
  position: relative;
}
.product .wrapper .row .card .delete:hover {
  background-color: var(--delHover);
}
.product .data-not-found {
  margin: 9rem 0.3em 0.3em 14.5em;
  color: #fff;
  font-size: 2.5rem;
  text-decoration: underline;
}

/* Media Queries */
@media (max-width: 768px) {
  .product .home-route {
    top: 1%;
  }
  .product h2 {
    margin: 0;
  }
  .product .user {
    margin: 3rem 0 0 1.5rem;
    font-size: 1.3rem;
  }
  .product .search-box {
    margin: 1.5rem 0.3em 0.3em 1.5em;
    width: 300px;
    font-size: 10px;
  }
  .product .add-route {
    margin: 1.5rem 0.3em 0.3em 1.5em;
    font-size: 1rem;
  }
  .product .data-not-found {
    margin: 7rem 0.3em 0.3em 4em;
  }
  .product .row .card .card-content .card-text h3,
  .product .row .card .card-content .card-text p {
    font-size: 1.7em;
  }
  .product .row .card .card-content .card-desc p {
    font-size: 1.3em;
  }
}

/* Laptop */
@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
  .product .user {
    margin: 3rem 0 0 9rem;
  }
  .product .search-box {
    margin: 1rem 0.3em 0.3em 9em;
  }
  .product .add-route {
    margin: 1rem 0.3em -2em 11em;
  }
  .product .data-not-found {
    margin: 7rem 0.3em 0.3em 15em;
    font-size: 2rem;
  }
}

/* Mobile Phone */
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
  .product .user {
    margin: 3rem 0 0 2rem;
    font-size: 1.6rem;
  }
  .product .search-box {
    margin: 1.5rem 0.3em 0.3em 1.5em;
    width: 300px;
    font-size: 10px;
  }
  .product .add-route {
    margin: 1.5rem 0.3em 0.3em 1.5em;
    font-size: 1.2rem;
  }
  .product .data-not-found {
    margin: 7rem 0.3em 0.3em 2em;
  }
}
</style>
