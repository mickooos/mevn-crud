<template>
  <div class="container">
    <div class="addproduct-page">
        <div class="card shadow" id="addproduct-form">
          <div class="card-header m-0">ADD PRODUCT</div>
          <div class="card-body">
            <div class="alert data-null" v-if="emptyForm">Filled Out The Form Below.</div>
            <div class="alert data-saved" v-if="addSuccess">Data Saved Successfully.</div>
            <div class="alert data-failed" v-if="addFailed">Data Can't Saved Completely.</div>
            <form class="form-horizontal" @submit.prevent="saveData">

              <div class="form-group cols-sm-6">
                <h5>Name</h5>
                <input type="text" name="name" class="form-control" v-model="addProduct.name">
                <p v-if="!nameIsValid" class="error-message">*Name Field Required</p>
              </div>

              <div class="form-group cols-sm-6">
                <h5>Price</h5>
                <input type="text" name="class" class="form-control" v-model="addProduct.price">
                <p v-if="!priceIsValid" class="error-message">*Price Field Required</p>
              </div>

              <div class="form-group cols-sm-6">
                <h5>Product Type</h5>
                <select class="form-control" name="gender" v-model="addProduct.type">
                    <option disabled value="">--- Select Type --</option>
                    <option value="monitor">Monitor</option>
                    <option value="keyboard">Keyboard</option>
                    <option value="mouse">Mouse</option>
                </select>
                <p v-if="!typeIsValid" class="error-message">*Select Product Type</p>
              </div>
              
              <div class="form-group cols-sm-6">
                <h5>Image</h5>
                <input type="file" name="image" class="form-control" @change="handleFileUpload($event)">
                <p v-if="!imageIsValid" class="error-message">*Image Required</p>
              </div>

              <div class="form-group cols-sm-6">
                <button type="submit" class="btn add-data" :disabled="!formIsValid">Save Data</button>
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
    name: "AddProduct",
    data() {
      return {
        addProduct: {
          name: null, 
          price: null, 
          type: null, 
          image: null
        },
    
        addSuccess: false,
        addFailed: false,
        emptyForm: true,
      }
    },

    computed: {
      nameIsValid() {
        return !!this.addProduct.name
      },
      priceIsValid() {
        return !!this.addProduct.price
      },
      typeIsValid() {
        return !!this.addProduct.type
      },
      imageIsValid() {
        return !!this.addProduct.image
      },
      formIsValid() {
        return this.nameIsValid && this.priceIsValid && this.typeIsValid && this.imageIsValid
      }
    },

    methods: {
      handleFileUpload(e) {
        this.addProduct.image = e.target.files[0];
      },
      saveData() {

        const addFormData = new FormData();
        addFormData.append("name", this.addProduct.name);
        addFormData.append("price", this.addProduct.price);
        addFormData.append("type", this.addProduct.type);
        addFormData.append("image", this.addProduct.image);

        if (this.formIsValid) {
          const apiurl = "http://localhost:5000/products";  
          axios.post(apiurl, addFormData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((response) => {
            this.emptyForm = false;
            this.addSuccess = true;
            this.$router.push("/");
            console.log(response);
          })
          .catch((err) => {
            this.emptyForm = false;
            this.addFailed = true;
            console.log("Data Can't Be Stored", err);
          });
        }
      }
    },
}
</script>

<style>
#addproduct-form {
  width: 75%;
  margin-left: 150px;
}

#addproduct-form .card-header {
  background-color: seagreen;
  color: white;
  text-align: center;
  margin-top: 5px;
  font-size: 1.5rem;
}

#addproduct-form .card-body .data-saved, .data-null {
  background-color: #23b065;
  color: white;
  font-size: 15px;
}

#addproduct-form .card-body .data-failed {
  background-color: firebrick;
  color: white;
  font-size: 15px;
}

#addproduct-form .card-body .form-group {
  margin-top: 5px;
}

#addproduct-form .card-body .form-group h5 {
  font-weight: 500;
  margin-bottom: 10px;
}

#addproduct-form .card-body .form-group .error-message {
  margin-top: 5px;
  font-size: 10px;
  color: firebrick;
}

#addproduct-form .card-body .form-group .add-data {
  margin-left: 26rem;
  background-color: seagreen;
  color: white;
}

#addproduct-form .card-body .form-group .add-data:hover {
  background-color: green;
  color: white;
}

#addproduct-form .card-body .form-group.add-data:disabled {
  background-color: #57bd83;
  color: white;
}

/* Media Queries */

/* Tablet */
@media (max-width: 1000px) {

    #addproduct-form {
        width: 100%;
        margin-left: 5px;
    }
    
    #addproduct-form .card-header h5{
        font-size: 2rem;
    }

    #addproduct-form .card-body .form-group h5 {
        font-size: 1.5rem;
    }

    #addproduct-form .card-body .form-group .add-data {
        margin-left: 16.3rem;
        font-size: 1.4rem;
    }

    #addproduct-form .card-body .form-group .error-message {
        font-size: 12px;
    }
}

/* Mobile Phone */
@media (max-width: 500px) {
    
    #addproduct-form {
        width: 95%;
        margin-left: 10px;
    }

    #addproduct-form .card-header h5{
        font-size: 1.5rem;
    }

    #addproduct-form .card-body .form-group h5 {
        font-size: 1.2rem;
    }

    #addproduct-form .card-body .form-group .add-data {
        margin-top: 1rem;
        margin-left: 8.5rem;
        font-size: 1.2rem;
    }

}


</style>