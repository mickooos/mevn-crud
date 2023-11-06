<template>
  <body>
    <RouterLink to="/" class="product-route"><i class="bi bi-arrow-left-circle"></i></RouterLink>
    <div class="container">
      <h1>edit<span class="title-span">Product.</span></h1>
      <p>Ubah Data Produk</p>
      <form @submit.prevent="editData">
        <div class="row">
          <div class="column">
            <label>Name</label>
            <input type="text" id="name" v-model="product.name" />
            <p v-if="!nameIsValid" class="err-msg">*Name is Required</p>
          </div>
          <div class="column">
            <label>Price</label>
            <input type="text" id="price" v-model="product.price" />
            <p v-if="!priceIsValid" class="err-msg">*Price is Required</p>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <label>Category</label>
            <select v-model="product.categories">
              <option disabled value="">-- Pilih Kategori Produk --</option>
              <option v-for="c in slctCat" :key="c.id">{{ c.name }}</option>
            </select>
            <p v-if="!catIsValid" class="err-msg">*Select Product Category</p>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <label>Description</label>
            <textarea placeholder="Deskripsi Produk" rows="3" v-model="product.desc"></textarea>
            <p v-if="!descIsValid" class="err-msg">*Description is Required</p>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <label>Image</label>
            <div class="image">
              <img :src="getImage(product.image)" alt="" class="product-image" />
            </div>
            <input type="file" id="image" @change="handleFileUpload($event)" />
            <p v-if="!imgIsValid" class="err-msg">*Image is Required</p>
          </div>
        </div>
        <button class="btn" :disabled="!formIsValid">Edit</button>
      </form>
    </div>
  </body>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
const route = useRoute()
const router = useRouter()

const product = ref({
  name: null,
  price: null,
  categories: null,
  desc: null,
  image: null
})
const newImage = ref(null)
const productId = route.params.id

const slctCat = ref([
  { id: 1, name: 'Monitor' },
  { id: 2, name: 'Keyboard' },
  { id: 3, name: 'Mouse' },
  { id: 4, name: 'Camera' },
  { id: 5, name: 'Microphone' }
])

const getProductsById = async (id) => {
  try {
    await axios
      .get(`/v2/product/${id}`)
      .then((res) => {
        product.value = res.data.product
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  } catch (error) {
    console.log({ error })
  }
}

getProductsById(productId)

const getImage = (img) => {
  return new URL(`../uploads/${img}`, import.meta.url).href
}

const nameIsValid = computed(() => {
  return !!product.value.name
})
const priceIsValid = computed(() => {
  return !!product.value.price
})
const catIsValid = computed(() => {
  return !!product.value.categories
})
const descIsValid = computed(() => {
  return !!product.value.desc
})
const imgIsValid = computed(() => {
  return !!product.value.image
})
const formIsValid = computed(() => {
  return (
    nameIsValid.value && priceIsValid.value && catIsValid.value && descIsValid && imgIsValid.value
  )
})

const handleFileUpload = (e) => {
  newImage.value = e.target.files[0]
}

const editData = () => {
  if (formIsValid.value) {
    const data = new FormData()
    data.append('name', product.value.name)
    data.append('price', product.value.price)
    data.append('categories', product.value.categories)
    data.append('desc', product.value.desc)
    data.append('image', newImage.value)
    data.append('oldImage', product.value.image)

    axios
      .put(`/v2/product/${productId}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        router.push({ path: '/' })
        console.log(res.data.message)
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  }
}
</script>

<style scoped>
div:first-child {
  --fontColor: #010101;
  --primary: #53a86c;
}

body {
  height: 100vh;
  background: linear-gradient(135deg, #53a86c, #298a46);
}
.product-route {
  color: #fff;
  position: relative;
  top: 10px;
  left: 5px;
  font-size: 1.5rem;
  top: 10px;
  padding: 0px 10px;
}
.product-route:hover {
  color: rgb(33, 116, 69);
}
.container {
  background-color: #ffffff;
  width: 70%;
  min-width: 420px;
  padding: 35px 50px;
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 10px;
  box-shadow: 20px 30px 25px rgba(0, 0, 0, 0.15);
}

h1 {
  font-size: 30px;
  color: var(--fontColor);
}

p {
  position: relative;
  margin: auto;
  width: 100%;
  color: var(--fontColor);
  font-size: 14px;
  font-weight: 400;
}
.title-span {
  color: #2eaa53;
}

form {
  width: 100%;
  position: relative;
  margin: 30px auto 0 auto;
}
.row {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px 30px;
  margin-bottom: 20px;
}

label {
  color: var(--fontColor);
  font-size: 14px;
  font-weight: 500;
}

textarea,
input,
select {
  width: 100%;
  font-weight: 400;
  padding: 8px 10px;
  font-weight: 500;
  color: var(--fontColor);
  border-radius: 5px;
  border: 1.2px solid #c4cae0;
  margin-top: 5px;
}

.err-msg {
  font-size: 10px;
  font-weight: 550;
  color: darkred;
  text-align: center;
}

textarea {
  resize: none;
}

textarea:focus,
input:focus,
select:focus {
  outline: none;
  border-color: #53a86c;
}

input[type='file']::file-selector-button {
  font-family: 'Poppins', sans-serif;
}

img {
  width: 120px;
  height: 120px;
}

button {
  border: none;
  padding: 10px 20px;
  background: #32a755;
  color: #ffffff;
  border-radius: 3px;
}

button:disabled {
  background: #37ac5a88;
}

/* Media Queries  */

/* Laptop */
@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {
  img {
    width: auto;
    height: 95px;
  }
}
</style>
