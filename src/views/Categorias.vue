<template>
    <div class="container">
        <h1 class="text-start">Listado Categorias |
            <button @click="newCategoria()" class="btn btn-success mx-2">
                <font-awesome-icon icon="plus" />
            </button>
        </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(categoria, index) in categorias" :key="index">
                    <th scope="row">{{ categoria.id }}</th>
                    <td>{{ categoria.name }}</td>
                    <td>{{ categoria.description }}</td>
                    <td>
                        <button @click="deleteCategoria(categoria.id)" class="btn btn-danger mx-2">
                            <font-awesome-icon icon="trash" />
                        </button>
                        <button @click="editCategoria(categoria.id)" class="btn btn-warning mx-2">
                            <font-awesome-icon icon="pencil" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name: 'Categoria',
    data() {
        return {
            categorias: []
        }
    },
    methods: {
        deleteCategoria(codigo) {
            Swal.fire({
                title: `¿Quieres borrar la categoria con el id ${codigo}?`,
                showCancelButton: true,
                confirmButtonText: 'Delete',
            }).then(result => { 
                if (result.isConfirmed) {
                    axios.delete(`http://127.0.0.1:8000/api/categorias/${codigo}`)
                        .then(response => {
                            if (response.data.success) {
                                Swal.fire('¡Eliminado!', '', 'success')
                                this.categorias = response.data.categorias
                            }
                        })
                }
            })
        },
        editCategoria(id) {
            this.$router.push({ name: 'EditarCategoria', params: { id:`${id}` } }) 
        },
        newCategoria() {
            this.$router.push({ name: 'NewCategoria' })
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8000/api/categorias')
            .then(response => {
                this.categorias = response.data.categorias
            })
    }
}
</script>
