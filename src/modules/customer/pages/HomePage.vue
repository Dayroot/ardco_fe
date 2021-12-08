<template>
    <Galleria
        :showIndicatorsOnItem="true"
        :showIndicators="true"
        :showThumbnails="false"
        :value="bannerImgs" 
        :circular="true"
        :autoPlay="true"
        :transitionInterval="1000"
    >         
        <template #item="image">
                <banner 
                    :imgUrl="image.data"
                ></banner>     
        </template>
    </Galleria>
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
