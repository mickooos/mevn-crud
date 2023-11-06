<template>
  <body>
    <RouterLink to="/" class="product-route"><i class="bi bi-arrow-left-circle" /></RouterLink>
    <div class="container">
      <h1>add<span class="title-span">Product.</span></h1>
      <p>Tambah Data Produk</p>
      <form @submit.prevent="submitData">
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
            <label>Image</label>
            <input type="file" id="image" @change="handleFileUpload($event)" />
            <p v-if="!imgIsValid" class="err-msg">*Image is Required</p>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <label>Description</label>
            <textarea placeholder="Deskripsi Produk" rows="3" v-model="product.desc"></textarea>
            <p v-if="!descIsValid" class="err-msg">*Description is Required</p>
          </div>
        </div>
        <div class="submit">
          <button class="btn" :disabled="!formIsValid">Submit</button>
        </div>
      </form>
    </div>
  </body>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const product = ref({
  name: null,
  price: null,
  categories: null,
  desc: null,
  image: null
})

const slctCat = ref([
  { id: 1, name: 'Monitor' },
  { id: 2, name: 'Keyboard' },
  { id: 3, name: 'Mouse' },
  { id: 4, name: 'Camera' },
  { id: 5, name: 'Microphone' }
])

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
    nameIsValid.value &&
    priceIsValid.value &&
    catIsValid.value &&
    descIsValid.value &&
    imgIsValid.value
  )
})

const submitData = () => {
  if (formIsValid.value) {
    axios
      .post('/v2/products', product.value, {
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

const handleFileUpload = (e) => {
  product.value.image = e.target.files[0]
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
  color: #000;
  font-size: 14px;
  font-weight: 450;
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

.err-msg {
  font-size: 10px;
  font-weight: 550;
  color: darkred;
  text-align: center;
}

textarea,
input,
select {
  width: 100%;
  font-weight: 500;
  color: var(--fontColor);
  padding: 8px 10px;
  border-radius: 5px;
  border: 1.2px solid #afb2bd;
  margin-top: 5px;
}

textarea {
  resize: none;
}

textarea:focus,
input:focus,
select:focus {
  outline: none;
  border-color: #afb2bd;
}

input[type='file']::file-selector-button {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
}

button {
  border: none;
  padding: 10px 20px;
  background: #37ac5a;
  color: #ffffff;
  border-radius: 3px;
}

button:disabled {
  background: #37ac5a88;
}
</style>
