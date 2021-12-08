<template>

    <Carousel 
        :value="bannerImgs" 
        :numVisible="1" 
        :numScroll="1" 
        :responsiveOptions="responsiveOptions" 
        :circular="true" 
        :autoplayInterval="3000"
    >         
        <template #item="image">
                <banner 
                    :imgUrl="image.data"
                ></banner>     
        </template>
    </Carousel>

</template>
<script>
import { defineAsyncComponent } from 'vue';
export default {
    components:{
        Banner: defineAsyncComponent(() => import( /* webpackChunkName: "banner" */ '../components/Banner')),
    },
    data() {
        return {
            bannerImgs: ["https://www.mochileandoporelmundo.com/wp-content/uploads/2019/07/es-seguro-viajar-a-colombia-peligroso.jpg", "../../../assets/images/picture-1.jpg"],
        }
    },
}
</script>