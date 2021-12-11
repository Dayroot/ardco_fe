<template>
    <!-- banner -->
    <div class="banner">
        <div class="banner__text marginsX-1">
            <h1 class="banner__title">
                ARTE DE COLOMBIA
            </h1>
            <p class="banner__description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed, tenetur sint explicabo doloremque fuga alias placeat totam aliquam repudiandae commodi praesentium blanditiis voluptatum eligendi minus odit non neque dignissimos id!
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
    created: function(){
        console.log(this.imgUrl);
    }
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
    @apply text-color-secondary-1-1 text-5xl ;
}
.banner__text {
    @apply absolute;
}

.banner__description {
    @apply text-gray-300 text-lg max-w-md;
}

</style>