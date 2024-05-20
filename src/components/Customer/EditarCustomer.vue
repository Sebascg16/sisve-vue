<template>
    <div class="container text-start">
        <h1 class="text primary fw-bold"> Editar Cliente</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Cliente
            </div>
            <div class="card-body">
                <form @submit.prevent="updateCustomer">
                
                    <div class="row mb-3">
                        <label for="document_number" class="form-label">Numero de Documento</label>
                        <div class="input-group">
                            <div class="input-group-text">
                            <font-awesome-icon icon="Id-card" />
                        </div>
                            <input type="text"class="form-control" id="document_number" placeholder="Numero de Documento" 
                                v-model="customer.document_number">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="first_name" class="form-label">Nombre</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="user" />
                            </div>
                            <input type="text" class="form-control" id="first_name" placeholder="Nombre" 
                            v-model="customer.first_name">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="last_name" class="form-label">Apellido</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="user" />
                            </div>
                            <input type="text" class="form-control" id="last_name" placeholder="Apellido" 
                            v-model="customer.last_name">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="address" class="form-label">Direccion</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="home" />
                            </div>
                            <input type="text" class="form-control" id="address" placeholder="Direccion" 
                            v-model="customer.address">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="birthday" class="form-label">Fecha de Nacimiento</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="calendar-alt" />
                            </div>
                            <input type="text" class="form-control" id="birthday" placeholder="Fecha de nacimiento" 
                            v-model="customer.birthday">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="phone_number" class="form-label">Numero de Telefono</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="phone" />
                            </div>
                            <input type="text" class="form-control" id="phone_number" placeholder="Telefono" 
                            v-model="customer.phone_number">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="email" class="form-label">Email</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="envelope" />
                            </div>
                            <input type="text" class="form-control" id="email" placeholder="Email" 
                            v-model="customer.email">
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Actualizar</button>
                    <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name:'EditarCustomer',
    data() {
        return {
            customer: {
                document_number: '',
                first_name: '',
                last_name: '',
                address: '',
                birthday: '',
                phone_number: '',
                email:''
            }
        }
    },
    methods: {
        cancel() {
            this.$router.push({name: 'Customers'})
        },
        async updateCustomer() {
            const res = await axios.put(`http://127.0.0.1:8000/api/customers/${this.customer.id}`, this.customer)
            if (res.status === 200) {
                this.$router.push({ name: 'Customers' });
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'El Cliente ha sido actualizado',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        }
    },
    mounted() {
        this.customer.id = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/customers/${this.customer.id}`)
            .then(response => {
                this.customer = response.data.customer;
            });
    },
}
</script>
