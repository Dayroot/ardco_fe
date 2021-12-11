<template>
    <div class="container">
        <div class = "content-container">
            <section class="section">
                <div class="section__header section__header-info">
                    <div class="section__title">
                        <label>Información personal</label>
                    </div>
                    <div class="section__button">
                        <button :class="{'button-edit': editInfo, 'button-cancel': !editInfo}" @click="setFormInfoState" >{{stateInfo}}</button>
                    </div>
                </div>
                <div :class="{'form':true, 'form-desactive':editInfo}">
                    <div class="form__row">
                        <div class="form__column form__column--left">
                            <label class="form__label"> Username </label>
                            <input type="text" class="form__input" :disabled="editInfo" v-model="user.username"/>
                        </div>
                        <div class="form__column">
                            <label class="form__label"> Fecha de nacimiento </label>
                            <input type="date" class="form__input" :disabled="editInfo" v-model="user.datebirth"/>
                        </div>  
                    </div>
                    <div class="form__row">
                        <div class="form__column ">
                            <label class="form__label"> Nombre completo </label>
                            <input type="text" :disabled="editInfo" v-model="user.fullname"/>
                        </div>   
                    </div>
                    <div class="form__row">
                        <div class="form__column form__column--left">
                            <label class="form__label"> Email </label>
                            <input type="text" class="form__input" :disabled="editInfo" v-model="user.email"/>
                        </div>
                        <div class="form__column">
                            <label class="form__label"> Identificación </label>
                            <input type="text" :disabled="editInfo" v-model="user.identification"/>
                        </div>   
                    </div>
                    <div class="form__row">
                        <div class="form__column form__column--left">
                            <label class="form__label"> Numero de telefono </label>
                            <input type="text" class="form__input" :disabled="editInfo" v-model="user.phone_number"/>
                        </div>
                        <div class="form__column">
                            <label class="form__label"> Dirección </label>
                            <input type="text" :disabled="editInfo" v-model="user.address"/>
                        </div>   
                    </div>
                </div>
                <button v-show="!editInfo" class="button-save" @click="changeInfo">Guardar</button>
                <span>{{resultMessageInfo}}</span>         
            </section>
            <section class="section">
                <div class="section__header">
                    <div class="section__title">
                        <label>Contraseña</label>
                    </div>
                    <div class="section__button">
                        <button :class="{'button-edit': true, 'button-cancel': !editPassword}" @click="setFormPasswordState">{{statePassword}}</button>
                    </div>
                </div>
                <div :class="{'form':true, 'form-desactive':editPassword}">
                    <div class="form__row">
                        <div class="form__column form__column--left">
                            <label class="form__label"> Nueva Contraseña </label>
                            <input type="text" class="form__input" :disabled="editPassword" v-model="firstPassword"/>
                        </div>
                        <div class="form__column">
                            <label class="form__label"> Repetir contraseña </label>
                            <input type="text" :disabled="editPassword" v-model="secondPassword"/>
                        </div>   
                    </div>            
                </div>
                <button v-show="!editPassword" class="button-save" @click="changePassword">Guardar</button> 
                <span>{{resultMessagePassword}}</span>         
            </section> 

        </div>
    </div>
   <Loading 
        v-model:active="isLoading"
        :can-cancel="true"
        :is-full-page="fullPage"
    />
</template>

<script>
import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
import { defineAsyncComponent } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2';

export default {
    components: { Loading, },
    data: function (){
        return {
             user: {
                id: null,
                username: "",
                password: "",
                fullname: "",
                datebirth:"",
                email: "",
                identification: "", 
                phone_number: "",
                address:"",
            },
            uneditedUser: null,
            firstPassword:"",
            secondPassword:"",
            editInfo: true,
            stateInfo: "editar",
            resultMessageInfo: "",
            editPassword: true,
            statePassword: "editar",
            resultMessagePassword: "",
            isLoading: true,
            fullPage: true,

        }
    },
    methods:{
        getDataUser: async function(){
            this.isLoading = true;
            await this.$apollo.query({
                query: gql`
                    query($userId: Int!) {
                        userDetailById(userId: $userId) {
                            id
                            username
                            fullname
                            datebirth
                            email
                            identification
                            phone_number
                            address
                        }
                    }
                `,
                variables: {
                    userId: await jwt_decode(localStorage.getItem("token_access")).user_id,            
                }
            })
            .then( response => {
                this.user= {
                    id: response.data.userDetailById.id,
                    username: response.data.userDetailById.username,
                    password: response.data.userDetailById.password,
                    fullname: response.data.userDetailById.fullname,
                    datebirth: response.data.userDetailById.datebirth,
                    email: response.data.userDetailById.email,
                    identification: response.data.userDetailById.identification, 
                    phone_number: response.data.userDetailById.phone_number,
                    address: response.data.userDetailById.address,
                };
                this.uneditedUser = this.user;
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
            this.isLoading = false;
        },
         changeInfo: async function(updatePassword = "no"){         
            
                this.isLoading = true;
                const token = localStorage.getItem("token_access");
                const id = jwt_decode(token).user_id;
                let data = this.user;
                delete data.id;
                if(updatePassword == "yes"){
                     data = { "password": this.user.password}
                }

                await this.$apollo.mutate({
                    mutation: gql`
                        mutation($userId: Int!, $userUpdateInput: UserUpdateInput!) {
                            updateUser(userId: $userId, userUpdateInput: $userUpdateInput) {
                                id
                                username
                                fullname
                                datebirth
                                email
                                identification
                                phone_number
                                address
                            }
                        }

                    `,
                    variables: {
                        userId: id,
                        userUpdateInput: data,          
                    }
                })
                .then( response => {
                    this.user= {
                        id: response.data.updateUser.id,
                        username: response.data.updateUser.username,
                        fullname: response.data.updateUser.fullname,
                        datebirth: response.data.updateUser.datebirth,
                        email: response.data.updateUser.email,
                        identification: response.data.updateUser.identification, 
                        phone_number: response.data.updateUser.phone_number,
                        address: response.data.updateUser.address,
                    };
                    this.uneditedUser = this.user;
                    let msg;
                    if(updatePassword== "yes"){
                        this.setFormPasswordState();
                        msg = "La contraseña ha sido actualizada!"
                    }else {
                        this.setFormInfoState();
                        msg = "La información ha sido actualizada!"
                    }          
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: msg,
                        showConfirmButton: false,
                        timer: 2500
                    });
                    
                })
                .catch(e => {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        text: 'Los cambios no han sido guardados!',
                        showConfirmButton: false,
                        timer: 2500
                    });
                    console.log(JSON.stringify(e, null, 2));
                });
                this.isLoading = false;
        },
        changePassword(){
            if( this.firstPassword == this.secondPassword){
                this.user.password = this.firstPassword;
                this.changeInfo("yes");
            }
        },
        setFormInfoState(){
            this.resultMessageInfo = ""
            this.editInfo= !this.editInfo;
            if(this.stateInfo=="editar"){
                this.stateInfo = "cancelar"
            }else{
                this.stateInfo = "editar"
                this.user = this.uneditedUser;
            }

        },
        setFormPasswordState(){
            this.editPassword= !this.editPassword;
            if(this.statePassword=="editar"){
                this.statePassword = "cancelar"
            }else{
                this.statePassword = "editar"
                this.user = this.uneditedUser;
            }
        },
    },
    mounted() {
        this.getDataUser();
    },
      
}
</script>

<style lang="css" scoped>
    
    .container {
        display: flex;
        align-items:center;
        justify-content: center;
        height: 100vh;
        @apply text-color-secondary-2-0;
    }
    .content-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-self: center;
        border-radius: 20px;
        @apply bg-color-secondary-1-1 shadow;
    }
    .title-main{
        text-align: center;
        margin:10px 0px 0px 10px;
        font-size: 20px;
    }
    .section{
        display: flex;
        justify-content:center;
        flex-direction: column;
        margin-bottom: 20px;
        text-align: center;
    }
    .section__header{
        padding:20px 50px;
        margin-bottom: 20px;
        @apply bg-gray-300 bg-opacity-40;
    }
    .section__header-info{
        border-radius: 20px 20px 0 0;
    }

    .section__title{
        position: absolute;
        display: flex;
        justify-content:left;
        align-items: center;
        @apply text-xl;
    }
    button{
        border: none;
        background: none;
        display: flex;
        width: 70px;
        text-transform: capitalize;
        cursor: pointer;
    }
    .button-edit {
        text-indent: 30px;
        display: flex;
        background-image: url('../../../assets/icons/edit.svg');
        background-repeat: no-repeat;
        background-position: left;
    }
    .button-cancel{
        text-indent: 30px;
        display: flex;
        background-image: url('../../../assets/icons/cancel.svg');
        background-repeat: no-repeat;
        background-position: left;
    }
    .section__button{
        display: flex;
        justify-content:right;
        align-items: center;
        font-weight: 400;
    }
    .form{
        display: flex;
        flex-direction: column;
        justify-content:center;
        align-items: start;
    }
    .form-desactive{
        @apply opacity-30;
    }


    .form__row{
        display: flex;
        /* align-items: center; */
        margin-bottom: 20px;
        padding: 10px 50px;
        width: 100%;
    } 
    
    .form__column{
        display: flex;
        align-items: start;
        flex-direction: column;
        width: 100%;
        @apply border-b border-color-secondary-2-0;
    }
    .form__column--left{
        margin-right: 20px;
    }

    .form__label{
        margin-bottom: 5px;
    }

    .form-desactive .form__column {
        @apply border-b;
    }

    input {
        background: none;
        border:none;
        border-radius: 4px;
        width: 280px;
        @apply text-gray-400
    }
    input:focus {
        outline:none;
    }

    .button-save{
        @apply bg-color-primary-2;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 30px;
        border-radius: 4px;
        transition: all 80ms ease-in-out;
        @apply hover:bg-color-primary-0;
    }

    .button-save:active {
        @apply opacity-60;
    }

</style>