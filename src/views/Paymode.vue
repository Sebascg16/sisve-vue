<template>
    <div class="container">
      <h1 class="text-start">
        Listado de modos de pago |
        <button @click="newPaymode()" class="btn btn-success mx-2">
          <font-awesome-icon icon="plus"/>
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Observación</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(paymode, index) in paymodes" :key="index">
            <th scope="row">{{ paymode.id }}</th>
            <td>{{ paymode.name }}</td>
            <td>{{ paymode.observation }}</td>
            <td>
              <button @click="deletePayMode(paymode.id)" class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
              <button @click="editPayMode(paymode.id)" class="btn btn-warning mx-2">
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

export default{
name:'PayMode',
data(){
    return{
        paymodes:[]
    }
},
methods:{
    deletePayMode(codigo){
        Swal.fire({
            title: `Do you want to delete the pay mode with id ${codigo}?`,
            showCancelButton: true,
            confirmButtonText: 'Delete',

        }).then(result=>{
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/paymodes/${codigo}`)
                .then(response=>{
                    if (response.data.success) {
                        Swal.fire('Deleted!', '', 'success')
                        this.paymodes = response.data.paymodes
                    }
                })
            }
        })
    },
    editPayMode(id){
        this.$router.push({name:'EditarPaymode',params:{id: `${id}` }})

    },
    newPaymode(){
        this.$router.push({name:'NewPaymode'})
    }
},
mounted(){
    axios.get('http://127.0.0.1:8000/api/paymodes')
    .then(response=>(
        this.paymodes=response.data.paymodes
    ))
}
}


</script>