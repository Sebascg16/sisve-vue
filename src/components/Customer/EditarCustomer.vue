<template>
    <div class="container text-start">
        <h1 class="text-primary fw-bold">Editar Cliente</h1>
        <div class="card">
            <div class="card-header fw-bold">Cliente</div>
            <div class="card-body">
                <form @submit.prevent="updateCustomer">
                    <div class="row mb-3" v-for="(label, key) in fields" :key="key">
                        <label :for="key" class="form-label">{{ label }}</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon :icon="icons[key]" />
                            </div>
                            <input v-if="key !== 'category_id'" type="text" class="form-control" :id="key" :placeholder="label"
                                v-model="customer[key]" />
                            <select v-else class="form-select" :id="key" v-model="customer[key]">
                                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                            </select>
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">Guardar</button>
                    <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'EditarCustomer',
    data() {
        return {
            customer: {
                id: null,
                document_number: null,
                first_name: null,
                last_name: '',
                address: '',
                birthday: '',
                phone_number: '',
                email: ''
            },
            categories: [],
            fields: {
                document_number: 'Número de Documento',
                first_name: 'Nombre',
                last_name: 'Apellido',
                address: 'Dirección',
                birthday: 'Fecha de Nacimiento',
                phone_number: 'Número de Teléfono',
                email: 'Correo Electrónico'
            },
            icons: {
                document_number: 'id-card',
                first_name: 'user',
                last_name: 'user',
                address: 'home',
                birthday: 'calendar',
                phone_number: 'phone',
                email: 'envelope'
            },
            loading: true
        };
    },
    methods: {
        cancel() {
            this.$router.push({ name: 'Customers' });
        },
        async updateCustomer() {
            try {
                const res = await axios.put(`http://127.0.0.1:8000/api/customers/${this.customer.id}`, this.customer);
                if (res.status === 200) {
                    this.$router.push({ name: 'Customers' });
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Cliente ha sido actualizado',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                if (error.response && error.response.status === 422) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de Validación',
                        text: 'Por favor, verifica los datos ingresados.',
                        footer: Object.values(error.response.data.errors).join('<br>')
                    });
                } else {
                    console.error('Error actualizando el cliente:', error);
                }
            }
        },
        async loadCustomer() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/customers/${this.$route.params.id}`);
                this.customer = response.data.customer;
                this.loading = false;
            } catch (error) {
                console.error('Error cargando el cliente:', error);
            }
        },
        async loadCategories() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/categories');
                this.categories = response.data.categories;
            } catch (error) {
                console.error('Error cargando las categorías:', error);
            }
        }
    },
    async mounted() {
        await this.loadCustomer();
        await this.loadCategories();
    }
};
</script>
