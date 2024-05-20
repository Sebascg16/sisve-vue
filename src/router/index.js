import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import NewCategoria from '../components/Categoria/NewCategoria.vue';
import EditarCategoria from '../components/Categoria/EditarCategoria.vue';
import Categorias from '../views/Categorias.vue';
import NewPaymode from '../components/Paymode/NewPaymode.vue';
import EditarPaymode from '../components/Paymode/EditarPaymode.vue';
import Paymodes from '../views/Paymode.vue';
import Customers from '../views/Customers.vue';
import EditarCustomer from '../components/Customer/EditarCustomer.vue';
import NewCustomer from '../components/Customer/NewCostumer.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/new-categoria',
        name: 'NewCategoria',
        component: NewCategoria
    },
    {
        path: '/editar-categoria/:id',
        name: 'EditarCategoria',
        component: EditarCategoria
    },
    {
        path: '/categorias', 
        name: 'Categorias',
        component: Categorias
    },
    {
        path: '/new-paymode',
        name: 'NewPaymode',
        component: NewPaymode
    },
    {
        path: '/editar-paymode/:id',
        name: 'EditarPaymode',
        component: EditarPaymode
    },
    {
        path: '/paymodes', 
        name: 'Paymodes',
        component: Paymodes
    },
    {
        path: '/new-customer',
        name: 'NewCustomer',
        component: NewCustomer
    },
    {
        path: '/editar-customer/:id',
        name: 'EditarCustomer',
        component: EditarCustomer
    },
    {
        path: '/customers', 
        name: 'Customers',
        component: Customers
    },
    {
        path: '/about', 
        name: 'About',
        component: () => import('../views/AboutView.vue') 
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
