<template>
    <div>
        
    </div>
</template>

<script>
export default {
    props: {
        productId:{
            type: String,
            required: true
        }
    },

    mounted() {
        alert(productId);
    },
}
</script>