<template>
    <div class="user-modal">
        <div v-if="auth">
            <div class="user-modal__header">
                <div class="text-5xl">
                    <i class="fas fa-user-circle"></i>
                </div>
                <p>Hola {{firstname}}</p>
            </div>
            <router-link :to="{name: 'account'}" class="user-modal__field-wrapper">
                <div class="user-modal__field-wrapper">
                    <p class="user-modal__field">mis datos</p>
                </div>
            </router-link>
            <router-link :to="{name: 'home'}" class="user-modal__field-wrapper">
                <div class="user-modal__field-wrapper">
                    <p class="user-modal__field">Compras</p>
                </div>
            </router-link>
            <router-link :to="{name: 'home'}" class="user-modal__field-wrapper">
                <div class="user-modal__field-wrapper">
                    <p class="user-modal__field">Preguntas</p>
                </div>
            </router-link>
            <router-link :to="{name: 'home'}" class="user-modal__field-wrapper">
                <div class="user-modal__field-wrapper">
                    <p class="user-modal__field">Vender</p>
                </div>
            </router-link>
            <div class="user-modal__field-wrapper" @click="setlogOut">
                <p class="user-modal__field">cerrar sesión</p>
            </div>
        </div>
        <div v-else>
            <router-link :to="{name: 'login'}">
                <div class="user-modal__field-wrapper">
                    <p class="user-modal__field">iniciar sesión</p>
                </div>
            </router-link>
            <router-link :to="{name: 'signUp'}" class="user-modal__field-wrapper">
                <div class="user-modal__field-wrapper">
                    <p class="user-modal__field">registrarse</p>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    props: ['auth'],
    methods:{
        setlogOut: function(){
            localStorage.clear();
            this.$router.push({ name: "home", params:{ logOut: true } });
        }
    }
}
</script>
<style lang="css" scoped>

    .user-modal {
        @apply absolute flex flex-col bg-color-secondary-1-1 rounded-sm;
        @apply top-9 right-0 w-52;
    }
    .user-modal__field {
        @apply px-6 py-2 cursor-pointer hover:text-color-secondary-2-0 transition;
        @apply capitalize text-gray-400 rounded-sm font-normal;
        @apply active:scale-95 transform;
    }

    .user-modal__field-wrapper{
        @apply hover:bg-color-secondary-2-0 rounded-sm hover:bg-opacity-12 transition;
    }
    .user-modal__header {
        @apply flex gap-3 items-center text-color-secondary-2-0 text-lg;
        @apply px-6 py-2 capitalize cursor-pointer font-medium;
    }
</style>