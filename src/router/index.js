import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import NewCategoria from '../components/Categoria/NewCategoria.vue';
import EditarCategoria from '../components/Categoria/EditarCategoria.vue';
import Categorias from '../views/Categorias.vue';

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
