import { createWebHistory, createRouter } from "vue-router";
import DashBoard from "../pages/DashBoard.vue";
import AddProduct from "../pages/AddProduct.vue";
import EditProduct from "../pages/EditProduct.vue";

const routes = [
    {
        path: "/",
        name: "DashBoard",
        component: DashBoard,
    },
    {
        path: "/add",
        name: "AddProduct",
        component: AddProduct,
    },
    {
        path: "/edit/:id",
        name: "EditProduct",
        component: EditProduct,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;