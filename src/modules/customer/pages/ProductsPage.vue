<template>

    <div class="marginsX-1 pt-5">
        <product-section
            :products="products"
        >
        </product-section>
    </div>

</template>

<script>

import { defineAsyncComponent } from 'vue';

export default{
    props : ['category'],
    components:{
        ProductSection: defineAsyncComponent(() => import( /* webpackChunkName: "productSection" */ '../components/products/ProductSection')),

    },

    data: function(){
        return {
            products: [
                {
                    _id:"dtfgavd",
                    name:"amarillo, real, huila ", 
                    price: 28000,
                    stock: 40, 
                    sold: 8,
                    category: {
                        _id:"efsb",
                        name:"sombreros",
                        features: {
                            color:"#FBD929",
                            material:"Palma real",
                            craftType:"",
                            department:"Huila",
                        } 
                    }, 
                    imgUrls: ["https://exitocol.vtexassets.com/arquivos/ids/6837232-1600-auto?v=637503836659070000&width=1600&height=auto&aspect=true"], 
                    average_review: 4,
                    total_review: 65, 
                },
                {
                    _id:"dtfgavd",
                    name:"azul, real, huila", 
                    price: 31000,
                    stock: 40, 
                    sold: 12,
                    category: {
                        _id:"efsb",
                        name:"sombreros",
                        features:{
                            color:"#1575CD",
                            material:"Palma real",
                            craftType:"",
                            department:"Huila",
                        } 
                    }, 
                    imgUrls: ["https://exitocol.vtexassets.com/arquivos/ids/6837232-1600-auto?v=637503836659070000&width=1600&height=auto&aspect=true"], 
                    average_review: 4,
                    total_review: 65, 
                },
                {
                    _id:"dtfgavd",
                    name:"rojo, iraca, bolivar", 
                    price: 23000,
                    stock: 40, 
                    sold: 3,
                    category: {
                        _id:"efsb",
                        name:"sombreros",
                        features:{
                            color:"#D42323",
                            material:"Iraca",
                            craftType:"",
                            department:"Bolivar",
                        } 
                    }, 
                    imgUrls: ["https://exitocol.vtexassets.com/arquivos/ids/6837232-1600-auto?v=637503836659070000&width=1600&height=auto&aspect=true"], 
                    average_review: 4,
                    total_review: 65, 
                },
                {
                    _id:"dtfgavd",
                    name:"blanco, pindo, magdalena", 
                    price: 42000,
                    stock: 40, 
                    sold: 25,
                    category: {
                        _id:"efsb",
                        name:"sombreros",
                        features:{
                            color:"#FFFFFF",
                            material:"Palma pindo",
                            craftType:"",
                            department:"Magdalena",
                        } 
                    }, 
                    imgUrls: ["https://exitocol.vtexassets.com/arquivos/ids/6837232-1600-auto?v=637503836659070000&width=1600&height=auto&aspect=true"], 
                    average_review: 4,
                    total_review: 65, 
                },
                {
                    _id:"dtfgavd",
                    name:"morado, iraca, norte xxx xxxxxxxxx xxxxxxxx", 
                    price: 19000,
                    stock: 40, 
                    sold: 137,
                    category: {
                        _id:"efsb",
                        name:"sombreros",
                        features:{
                            color:"#8500B4",
                            material:"Iraca",
                            craftType:"",
                            department:"Norte de santander",
                        } 
                    }, 
                    imgUrls: ["https://exitocol.vtexassets.com/arquivos/ids/6837232-1600-auto?v=637503836659070000&width=1600&height=auto&aspect=true"], 
                    average_review: 4,
                    total_review: 65, 
                },
                
            ],
        } 

    },
}
</script>

<style scoped>
        /* .container{
            display: grid;
            grid-template-rows: 1fr 100px;
            grid-template-columns: 800px 1fr;
            background: linear-gradient;
        }
        .sideBar{
            background: linear-gradient;
            display: flex;
        } */
</style>

