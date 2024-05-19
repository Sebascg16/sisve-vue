<template>
    <div class="container text-start">
        <h1 class="text primary fw-bold"> New </h1>
        <div class="card">
            <div class="card-header fw-bold">
                Categoria
            </div>
            <div class="card-body">
                <form @submit.prevent="saveCategoria">
                
                    <div class="row mb-3">
                        <label for="id" class="form-label">Id</label>

                        <div class="input-group">
                            <div class="input-group-text"> <font-awesome-icon icon="tag" /></div>
                            <input type="text"class="form-control" id="id" placeholder="Codigo Categoria" disabled
                                v-model="categoria.id"
                            >
                        </div>
                    </div>

                    <div class="row mb-3">

                        <label for="name" class="form-label">Nombre</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre de la categoria"
                                v-model="categoria.name"
                            >
                        </div>
                    </div>
                    <div class="row bm-3">
                        <label for="description" class="form-label">Descripción</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="description" placeholder="Descripcion de la categoria"
                                v-model="categoria.description">
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Agregar</button>
                    <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default{
    name: 'NewCategoria',
    data(){
        return {
            categoria:{
                id: 0,
                name: '',
                description: ''
            }
        };
    }, 
    methods: {
        cancel() {
            this.$router.push({name: 'Categorias'});
        },
        async saveCategoria(){
            const res= await axios.post('http://127.0.0.1:8000/api/categorias/', this.categoria);
            console.log(res)
            if (res.status==200) {
                this.$router.push({name:'Categorias'});
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Categoria creada exitosamente',
                    showConfirmButton: false,
                    timer: 2000
                }); 
            }
        }
    },
    mounted(){
        axios.get('http://127.0.0.1:8000/api/categorias/')
        .then(response=>{
            this.categorias = response.data.categorias
        })
    },
}
</script>