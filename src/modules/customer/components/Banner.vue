<template>
    <!-- banner -->
    <div class="banner">
        <div class="banner__text marginsX-1">
            <h1 class="banner__title">
                ARTE DE COLOMBIA
            </h1>
            <p class="banner__description">
                Los mejores productos tipicos en un solo lugar!
            </p>
        </div>
        <div>
            <img class="banner__img" :src="imgUrl" alt="">
        </div>
    </div>
    <!-- banner end -->
</template>
<script>
export default {
    props: {
        imgUrl: {
            type: String,
            required: true
        }
    },
}
</script>
<style lang="css" scoped>

.banner{
    @apply w-screen h-116 bg-blue-300 overflow-hidden relative flex items-center;
}
.banner__img{
    @apply object-fill w-screen h-full;
}

.banner__title {
    @apply text-color-secondary-2-0 text-5xl ;
}
.banner__text {
    @apply absolute;
}

.banner__description {
    @apply text-color-secondary-2-0 text-lg max-w-md;
}

</style>