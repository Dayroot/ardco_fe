<template>    
    <!-- top new arrival -->
       <div class="container pb-16">
        <!-- <h2 class="text-2xl md:text-3xl font-medium text-gray-800 uppercase mb-6">top new arrival</h2> -->
        <!-- product wrapper -->
        <div class="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
            <!-- single product -->
            <div class="group rounded bg-white shadow overflow-hidden">
                <!-- product image -->
                <div class="relative"> 
                    <img :src="product.imgUrls[0]" class="w-full">
                    <div
                        class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                        <router-link to=""
                            class="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center">
                            <i class="fas fa-search"></i>
                        </router-link>
                        <router-link to=""
                            class="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center">
                            <i :class="{'far fa-heart': true}"></i> 
                        </router-link>
                    </div>
                </div>
                <!-- product image end -->
                <!-- product content -->
                <div class="pt-4 pb-3 px-4">
                    <a href="view.html">
                        <h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                            {{product.name}}
                        </h4>
                    </a>
                    <div class="flex items-baseline mb-1 space-x-2 ">
                        <p class="text-xl text-primary font-roboto font-semibold ">${{product.price}}</p>
                        <!-- <p class="text-sm text-gray-400 font-roboto line-through">$55789</p>  -->
                    </div>
                    <div class="flex items-center">
                        <div class="flex gap-1 text-sm text-yellow-400">
                            
                            <span v-for="(star,index) in product.average_review" :key="index">
                                <i class="fas fa-star"></i>
                            </span>

                        </div>
                        <div class="text-xs text-gray-500 ml-3">({{product.total_review}})</div>
                    </div>
                </div>
                <!-- product content end -->
                <!-- product button -->
                <a href="#"
                    class="block w-full py-1 text-center text-white bg-color-primary-2 border border-color-primary-2 rounded-b hover:bg-transparent hover:text-color-primary-2 transition">
                    Add to Cart
                </a>
                <!-- product button end -->
            </div>
            <!-- single product end -->
            <!-- single product -->
    
        </div>
        <!--product wrapper end -->
    </div>
    <!-- top new arrival end -->
</template>


<script>

export default{
    props:["product"], 
    // data: () => ({
    //     //average_review: 1,   
    // }),
}
</script>