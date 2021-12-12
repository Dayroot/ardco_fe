<template>
    <!-- order complete wrapper -->
    <div class="max-w-3xl mx-auto px-4 pt-16 pb-24 flex justify-center flex-col items-center">
        <div class="mb-8 text-4xl bg-color-primary-0 rounded-full w-16 h-16 flex justify-center items-center">
            <i class="fas fa-check"></i>
        </div>
        <h2 class=" text-color-secondary-2-0 font-medium text-3xl mb-3">
            SU ORDEN ESTA COMPLETADA!
        </h2>
        <p class="text-gray-600 ">
            ¡Gracias por su orden! Su pedido se está procesando y se completará en un plazo de 3 a 6 horas. Vas a
             reciber una confirmación por correo electrónico cuando se complete el pedido.
        </p>
        <div class="mt-10">
            <router-link :to="{name: 'home'}" class="button-1 rounded p-3">Continuar comprando</router-link>
        </div>
    </div>
    <!-- order complete wrapper end -->
</template>