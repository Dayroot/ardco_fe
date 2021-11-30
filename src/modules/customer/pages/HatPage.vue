<template>

    <div class="container">        

        <div class="sideBar">
            <div>
                <sideBar
                    :product="product"
                >
                </sidebar>
            </div>
        </div>

        <div class="cart">
            <div>
                <cart
                    :product="product"
                >
                </cart>
            </div>
        </div>


    </div>

</template>

<script>

import { defineAsyncComponent } from 'vue';

export default{
    components:{
        Cart: defineAsyncComponent(() => import( /* webpackChunkName: "cart" */ '../components/Cart')),
        SideBar: defineAsyncComponent(() => import( /* webpackChunkName: "sidebar" */ '../components/SideBar'))
    },
    data: () => ({
        product: {
            _id:"dtfgavd",
            name:"sombrero volteao", 
            price: 35000,
            stock: 40, 
            sold: 12,
            category:{name:"sombrereros" , _id:"efsb"}, 
            imgUrls: ["https://exitocol.vtexassets.com/arquivos/ids/6837232-1600-auto?v=637503836659070000&width=1600&height=auto&aspect=true"], 
            average_review: 4,
            total_review: 65, 
        }   
    }),
}
</script>

<style>
        .container{
            display: grid;
            grid-template-rows: 1fr 100px;
            grid-template-columns: 800px 1fr;
            background: linear-gradient;
        }
        .sideBar{
            background: linear-gradient;
            display: flex;
        }
        .cart{
            
        }
</style>

