<template>
  <div class="container">
    <div class="editproduct-page">
        <div class="card shadow" id="editproduct-form">
          <div class="card-header m-0">EDIT PRODUCT</div>
          <div class="card-body">
            <div class="alert data-updated" v-if="updateSuccess">Data Updated Successfully.</div>
            <form class="form-horizontal" @submit.prevent="updateData">
    
              <div class="form-group cols-sm-6">
                <label>Name</label>
                <input type="text" name="name" class="form-control" v-model="editProduct.name">
                <p v-if="!nameIsValid" class="error-message">*Name Field Required</p>
              </div>

              <div class="form-group cols-sm-6">
                <label>Price</label>
                <input type="text" name="price" class="form-control" v-model="editProduct.price">
                <p v-if="!priceIsValid" class="error-message">*Price Field Required</p>
              </div>

              <div class="form-group cols-sm-6">
                <label>Product Type</label>
                <select class="form-control" name="product_type" v-model="editProduct.type">
                    <option v-for="select in productType" :key="select.id">{{ select.type }}</option>
                </select>
                <p v-if="!typeIsValid" class="error-message">*Select Product Type</p>
              </div>
              
              <div class="form-group cols-sm-6">
                <label>Image</label>
                <div class="image">
                  <img :src="require(`../assets/images/uploads/${editProduct.image}`)" alt="" class="editimage">
                </div>
                <input type="file" name="image" class="form-control" @change="handleFileUpload($event)">
                <p v-if="!imageIsValid" class="error-message">*Image Field Required</p>
              </div>

              <div class="form-group cols-sm-6">
                <button type="submit" class="btn add-data" :disabled="!formIsValid">Update Data</button>
              </div>

            </form>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "EditProduct",
    data() {
      return {
        editProduct: {
          name: null,
          price: null,
          type: '',
          image: null
        },
        productType: [
          { id: 1, type: 'Monitor'},
          { id: 2, type: 'Keyboard'},
          { id: 3, type: 'Mouse'}
        ],
        updateSuccess: false,
      }
    },

    created() {
      this.getProductsbyId();
    },

    computed: {
      nameIsValid() {
        return !!this.editProduct.name
      },
      priceIsValid() {
        return !!this.editProduct.price
      },
      typeIsValid() {
        return !!this.editProduct.type
      },
      imageIsValid() {
        return !!this.editProduct.image
      },
      formIsValid() {
        return this.nameIsValid && this.priceIsValid && this.typeIsValid && this.imageIsValid
      }
    },

    methods: {
      async getProductsbyId() {
        try {
          const apiURL = `http://localhost:5000/products/${this.$route.params.id}`;
          const response = await axios.get(apiURL);
          this.editProduct = response.data;
        } catch (err) {
          console.log(err);
        }
      },
      handleFileUpload(e) {
        this.editProduct.image = e.target.files[0];
      },
      updateData() {
        if (this.formIsValid) {

          const updateFormData = new FormData();
          updateFormData.append("name", this.editProduct.name);
          updateFormData.append("price", this.editProduct.price);
          updateFormData.append("type", this.editProduct.type);

          updateFormData.append("image", this.editProduct.image);
          updateFormData.append("oldImage", this.editProduct.image);

          const apiURL = `http://localhost:5000/products/${this.$route.params.id}`;
          axios.put(apiURL, updateFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            this.updateSuccess = true;
            this.$router.push("/");
            console.log(response);
          });
        } else {
            console.log("Data Updated Failed ❌");
        }
      },
    },
};
</script>

<style>
#editproduct-form {
  width: 75%;
  margin-left: 150px;
}

#editproduct-form .card-header {
  background-color: seagreen;
  color: white;
  text-align: center;
  margin-top: 5px;
  font-size: 1.5rem;
}

#editproduct-form .card-body .data-updated {
  background-color: #23b065;
  color: white;
  font-size: 15px;
}

#editproduct-form .card-body .form-group {
  margin-bottom: 10px;
}

#editproduct-form .card-body .form-group label {
  margin-bottom: 5px;
  font-size: 1.2rem;
}

#editproduct-form .card-body .form-group .image .editimage {
  width: 180px;
  height: 150px;
  margin-bottom: 15px;  
}

#editproduct-form .card-body .add-data {
  margin-left: 25rem;
  margin-top: 15px;
  background-color: seagreen;
  color: white;
}

#editproduct-form .card-body .add-data:hover {
  background-color: green;
  color: white;
}

#editproduct-form .card-body .add-data:disabled {
  background-color: #57bd83;
  color: white;
}

#editproduct-form .card-body .form-group .error-message {
  margin-top: 5px;
  font-size: 10px;
  color: firebrick;
}


@media (max-width: 1000px) {

  #editproduct-form {
      width: 100%;
      margin-left: 10px;
  }

  #editproduct-form .card-header {
      font-size: 1.5rem;
  }


  #editproduct-form .card-body .add-data {
      margin-left: 16rem;
      margin-top: 15px;
      font-size: 1.3rem;
  }

}

@media (max-width: 500px) {

  #editproduct-form {
      width: 90%;
      margin-left: 20px;
  }

  #editproduct-form .card-body .add-data {
      margin-left: 6.5rem;
      margin-top: 15px;
      font-size: 1.2rem;
  }

}

</style>