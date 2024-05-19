<template>
    <div class="container text-start">
        <h1 class="text primary fw-bold"> Editar Modo de Pago</h1>
        <div class="card">
            <div class="card-header fw-bold">
                Modo de Pago
            </div>
            <div class="card-body">
                <form @submit.prevent="updatePaymode">
                
                    <div class="row mb-3">
                        <label for="id" class="form-label">Id</label>

                        <div class="input-group">
                            <div class="input-group-text"> <font-awesome-icon icon="tag" /></div>
                            <input type="text"class="form-control" id="id" placeholder="Codigo Paymode" disabled
                                v-model="paymode.id"
                            >
                        </div>
                    </div>

                    <div class="row mb-3">

                        <label for="name" class="form-label">Nombre</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="name" placeholder="Nombre del Paymode"
                                v-model="paymode.name"
                            >
                        </div>
                    </div>
                    <div class="row bm-3">
                        <label for="observation" class="form-label">Observación</label>
                        <div class="input-group">
                            <div class="input-group-text">
                                <font-awesome-icon icon="building" />
                            </div>
                            <input type="text" class="form-control" id="observation" placeholder="Observacion del Paymode"
                                v-model="paymode.observation">
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
    name:'EditarPaymode',
    data() {
        return {
            paymode: {
                id: 0,
                name: '',
                observation: ''
            }
        }
    },
    methods: {
        cancel() {
            this.$router.push({name: 'Paymodes'})
        },
        async updatePaymode() {
            const res = await axios.put(`http://127.0.0.1:8000/api/paymodes/${this.paymode.id}`, this.paymode);
            if (res.status == 200) {
                this.$router.push({ name: 'Paymodes' });
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Paymode ha sido actualizado',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }
    },
    mounted() {
        this.paymode.id = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/paymodes/${this.paymode.id}`)
            .then(response => {
                this.paymode = response.data.paymode;
            });
    },
}
</script>
