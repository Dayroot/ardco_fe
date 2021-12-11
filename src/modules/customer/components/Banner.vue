<template>
    <!-- banner -->
    <div class="banner">
        <div class="banner__text marginsX-1">
            <div class="bg-black bg-opacity-50 rounded p-6">
                <h1 class="banner__title">
                    {{banner.title}}
                </h1>
                <p class="banner__description">
                    {{banner.body}}
                </p>
            </div>
        </div>
        <div>
            <img class="banner__img" :src="banner.img" alt="">
        </div>
    </div>
    <!-- banner end -->
</template>
<script>
export default {
    props: {
        banner: {
            type: Object,
            required: true
        }
    },
    created() {
        console.log(this.banner);
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