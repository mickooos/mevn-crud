<template>
  <div class="container">
    <div class="dashboard">
      <router-link class="btn add-button" to="/add">ADD PRODUCT</router-link>
      <input type="text" class="form-control search-box" v-model="search" placeholder="Search Product...">
      <div v-if="filteredProducts.length">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Price</th>
                <th scope="col">Product Type</th>
                <th scope="col">Product Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
  
            <tbody v-for="prdct in filteredProducts" :key="prdct.id">
              <tr>
                <th scope="row" data-title="No.">{{ prdct.id }}</th>
                <td data-title="Product Name">{{ prdct.name }}</td>
                <td data-title="Product Price">IDR {{ prdct.price }}</td>
                <td data-title="Product Title">{{ prdct.type }}</td>
                <td data-title="Product Image">
                  <div class="image">
                    <img :src="require(`../assets/images/uploads/${prdct.image}`)" alt="" class="productimage">
                  </div>
                </td>
                <td>
                  <router-link :to="{ name: 'EditProduct', params: { id: prdct.id } }" class="btn edit-button">EDIT</router-link>
                  <a class="btn delete-button" @click="deleteProduct(prdct.id)">DELETE</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <p class="empty-data">Sorry, Data Not Found :(</p>
      </div>
    </div>
    <FooTer />
  </div>
</template>

<script>
import axios from "axios";
import FooTer from "../components/FooterComponent.vue";
export default {
    name: "DashBoard",
    components: {
      FooTer
    },
    data() {
      return {
        products: [],
        search: '',
      };
    },

    created() {
      this.getProducts();
    },
  
    computed: {
      filteredProducts() {
        return this.products.filter((p) => {
          return p.name.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    },

    methods: {
      async getProducts() {
        try {
          const apiURL = "http://localhost:5000/products";
          const response = await axios.get(apiURL);
          this.products = response.data;
        } catch (err) {
          console.log(err);
        }
      },

      async deleteProduct(id) {
        try {
          const apiURL = `http://localhost:5000/products/${id}`     
          await axios.delete(apiURL);
          this.getProducts();
        } catch (err) {
          console.log(err);
        }
      },
    },
};
</script>

<style>

.add-button {
  margin-bottom: 20px;
  font-weight: 600;
  background-color: seagreen;
  color: white;
}

.add-button:hover {
  background-color: green;
  color: white;
}

.search-box {
  display: block;
  width: 440px;
  margin-bottom: 15px;
  padding: 10px 45px;
  background: white url("../assets/images/search-icon.png") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.image .productimage {
  width: 95px;
  height: 75px;
}

.edit-button {
  margin-right: 10px;
  margin-top: 5px;
  font-weight: 600;
  background-color: royalblue;
  color: white;
}

.edit-button:hover {
  background-color: #17679c;
  color: white;
}

.delete-button {
  margin-top: 5px;
  font-weight: 600;
  background-color: #db2c0d;
  color: white;
}

.delete-button:hover {
  background-color: firebrick;
  color: white;
}

.empty-data {
  margin-top: 4rem;
  margin-left: 30rem;
  color: seagreen;
  font-size: 2rem;
  text-decoration: underline;
}

thead {
  background-color: seagreen;
  color: white;
  text-align: center;
}

tbody {
  text-align: center;
}

/* Media Queries */

/* Tablet */
@media (max-width: 1000px) {

    .add-button {
        margin-bottom: 10px;
        background-color: seagreen;
        color: white;
        font-size: 1.4rem;
    } 

    .search-box {
        display: block;
        width: 550px;
        height: 50px;
        margin-top: 10px;
        margin-bottom: 25px;
        padding: 10px 45px;
        background: white url("../assets/images/search-icon.png") no-repeat 15px center;
        background-size: 15px 15px;
        font-size: 25px;
        border: none;
        border-radius: 5px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
          rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }

    .empty-data {
        margin-top: 3rem;
        margin-left: 5rem;
        color: seagreen;
        font-size: 3rem;
        text-decoration: underline;
    }
}

/* Mobile Phone */
@media (max-width: 500px) {

    table thead {
        display: none;
    }

    .table, .table tbody, .table tr, .table td {
        display: block;
        width: 100%;
    } 

    .table tr {
        margin-bottom: 15px;
    }
    
    .table th {
        background-color: seagreen;
        color: white;
    }

    .table td {
        position: relative;
        font-weight: 600;
    }

    .add-button {
        margin-bottom: 10px;
        background-color: seagreen;
        color: white;
        font-size: 1.5rem;
    }

    .search-box {
        display: block;
        width: 350px;
        height: 50px;
        margin-top: 10px;
        margin-bottom: 20px;
        padding: 10px 45px;
        background: white url("../assets/images/search-icon.png") no-repeat 15px center;
        background-size: 15px 15px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
          rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }

    .edit-button, .delete-button {
        margin-bottom: 5px;
    }

    .empty-data {
        margin-top: 3rem;
        margin-left: 2rem;
        color: seagreen;
        font-size: 2rem;
        text-decoration: underline;
    }

}

</style>