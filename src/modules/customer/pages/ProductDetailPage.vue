<template>
    <div class="marginsX-2 publication-container">
        <!-- product view -->
        <section class="product">
            <!-- product image -->
            <article class=" bg-green-500 images">
                <div>
                    <img src="https://exitocol.vtexassets.com/arquivos/ids/6837232-1600-auto?v=637503836659070000&width=1600&height=auto&aspect=true" class="images__main">
                </div>
                <div class="images__list">
                    <div>
                        <img src="https://exitocol.vtexassets.com/arquivos/ids/6837232-1600-auto?v=637503836659070000&width=1600&height=auto&aspect=true" class="images__single">
                    </div>
                    <div>
                        <img src="https://exitocol.vtexassets.com/arquivos/ids/6837232-1600-auto?v=637503836659070000&width=1600&height=auto&aspect=true" class="images__single">
                    </div>
                    <div>
                        <img src="https://exitocol.vtexassets.com/arquivos/ids/6837232-1600-auto?v=637503836659070000&width=1600&height=auto&aspect=true" class="images__single">
                    </div>
                    <div>
                        <img src="https://exitocol.vtexassets.com/arquivos/ids/6837232-1600-auto?v=637503836659070000&width=1600&height=auto&aspect=true" class="images__single">
                    </div>
                </div>
            </article>
            <!-- product image end -->
            <!-- product content -->
            <article>
                <h2 class="product__name">{{publication.product.name}}</h2>
                <router-link to="" class="review">
                    <div class="review__stars">     
                        <span v-for="(star,index) in publication.product.average_review" :key="index">
                            <i class="fas fa-star"></i>
                        </span>
                    </div>
                    <div class="review__quantity">({{publication.product.total_review}} reseñas)</div>
                </router-link>
                <div class="space-y-2 capitalize">
                    <p class="space-x-2">
                        <span class="product__feature">Disponibilidad: </span>
                        <span class="text-green-600 font-bold">En Stock</span>
                    </p>
                    <p class="space-x-2">
                        <span class="product__feature">Departamento: </span>
                        <span class="text-gray-600">{{publication.product.category.features.department}}</span>
                    </p>
                    <p class="space-x-2">
                        <span class="product__feature">Categoria: </span>
                        <span class="text-gray-600">{{publication.product.category.name}}</span>
                    </p>
                    <p class="space-x-2">
                        <span class="product__feature">Material: </span>
                        <span class="text-gray-600">{{publication.product.category.features.material}}</span>
                    </p>
                </div>
                <div class="product__price">
                    <span class="product__value">${{publication.product.price}}</span>
                    <!-- <span class="text-gray-500 text-base line-through">$500.00</span> -->
                </div>
                <p class="product__description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim exercitationem quaerat excepturi
                    labore blanditiis
                </p>
            
                <!-- color -->
                <div class="mt-4">
                    <h3 class="option__title">Color</h3>
                    <!-- single color -->
                    <div>
                        <label :style="{'background-color':publication.product.category.features.color }"
                            class="product__color">
                        </label>
                    </div>
                    <!-- single color end --> 
                </div>
                <!-- color end -->
                <!-- quantity -->
                <div class="mt-4">
                    <div class="quantity-selector__title">
                        <h3>Quantity</h3>
                        <span>({{publication.product.stock}} disponibles)</span>
                    </div>
                    <div class="quantity-selector__content">
                        <div class="quantity-selector__button" @click="setQuantity('subtract')">-</div>
                        <div class="quantity-selector__value">{{quantity}}</div>
                        <div class="quantity-selector__button" @click="setQuantity('add')">+</div>
                    </div>
                </div>
                <!-- color end -->
                <!-- buttons -->
                <div class="product__buttons">
                    <button class="button-1 button-1--v2">
                        <span class="mr-2">AGREGAR</span>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </button>
                    <button  class="button-2" @click="setLike">
                        <span class="mr-2">FAVORITOS</span>
                        <i :class="{'far fa-heart': !like, 'fas fa-heart': like}"></i>
                    </button>
                </div>
                <!-- buttons end -->
                <!-- product share icons -->
                <div class="flex space-x-3 mt-4">
                    <a href="https://www.facebook.com/" class="share-icon" target="_blank">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com/" class="share-icon" target="_blank">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.instagram.com/" class="share-icon" target="_blank">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
                <!-- product share icons end -->
            </article>
            <!-- product content end -->
        </section>
        <!-- product view end --> 
        <!-- questions and answers -->
        <section class="questions-section-container">
            <div class="questions-section__title">
                <h1>Preguntas y Respuestas</h1>
                <i class="fas fa-question-circle"></i>
            </div>
            <div class="question-entry">
                <label class="question-entry__label">Pregúntale al vendedor</label>
                <input 
                    type="text" 
                    name="question input" 
                    class="question-entry__input"
                    placeholder="Escribe tu pregunta..."
                />
            </div>
            <div class="questions">
               <label class="question-entry__label">Últimas realizadas</label>
               <div class="questions__question-wrapper">
                   <p class="questions__question"></p>
                   <p class="questions__answer"></p>
               </div>
               <Carousel :value="products" :numVisible="4" :numScroll="2" :responsiveOptions="responsiveOptions">
                
                <template #item="producto">
                        <div class=" h-56 w-56">
                            <img :src="producto.data.img" alt="">
                        </div>
                    
                </template>
            </Carousel>
            </div>
        </section>
        <!-- questions and answers end-->
    </div>
</template>

<script>
export default {
    props: {
        productId:{
            type: String,
           
        }
    },
    data() {
        return {
            products:[
                {
                    img: "https://exitocol.vtexassets.com/arquivos/ids/6837232-1600-auto?v=637503836659070000&width=1600&height=auto&aspect=true"
                },
                {
                    img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cats-trailer-taylor-swift-1563523331.jpg?crop=0.570xw:1.00xh;0.289xw,0&resize=480:*"
                },
                {
                    img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cats-trailer-taylor-swift-1563523331.jpg?crop=0.570xw:1.00xh;0.289xw,0&resize=480:*"
                },
                {
                    img: "https://ichef.bbci.co.uk/news/640/cpsprodpb/150EA/production/_107005268_gettyimages-611696954.jpg"
                },
                {
                    img: "https://ichef.bbci.co.uk/news/640/cpsprodpb/150EA/production/_107005268_gettyimages-611696954.jpg"
                },
                {
                    img: "https://ichef.bbci.co.uk/news/640/cpsprodpb/150EA/production/_107005268_gettyimages-611696954.jpg"
                },
                {
                    img: "https://ichef.bbci.co.uk/news/640/cpsprodpb/150EA/production/_107005268_gettyimages-611696954.jpg"
                },

            ],
            responsiveOptions: [
			{
				breakpoint: '1024px',
				numVisible: 3,
				numScroll: 3
			},
			{
				breakpoint: '600px',
				numVisible: 2,
				numScroll: 2
			},
			{
				breakpoint: '480px',
				numVisible: 1,
				numScroll: 1
			}
		],
            publication:{
                product: {
                    _id:"dtfgavd",
                    name:"amarillo, real, huila ", 
                    price: 28000,
                    stock: 3, 
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
                userId: 1,
                publication_date: "2021-12-4",
                description: "Incredible graphics performanceMacBook Air can take on more graphics-intensive projects than ever. For the first time, content creators can  edit and seamlessly play back multiple streams of full‑quality 4K video without dropping a frame."
            },
            questions:[
                {
                    date: "2021-12-4",
                    userId: 1,
                    text: "¿Este producto es aprueba de agua?",
                    answer: null,
                    status: "sin responder"
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    text: "¿Este producto es aprueba de agua?",
                    answer: null,
                    status: "sin responder"
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    text: "¿Este producto es aprueba de agua?",
                    answer: null,
                    status: "sin responder"
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    text: "¿Este producto es aprueba de agua?",
                    answer: null,
                    status: "sin responder"
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    text: "¿Este producto es aprueba de agua?",
                    answer: null,
                    status: "sin responder"
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    text: "¿Este producto es aprueba de agua?",
                    answer: null,
                    status: "sin responder"
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    text: "¿Este producto es aprueba de agua?",
                    answer: null,
                    status: "sin responder"
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    text: "¿Este producto es aprueba de agua?",
                    answer: null,
                    status: "sin responder"
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    text: "¿Este producto es aprueba de agua?",
                    answer: null,
                    status: "sin responder"
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    text: "¿Este producto es aprueba de agua?",
                    answer: null,
                    status: "sin responder"
                }
            ],
            like: false,
            quantity: 0,
        }
    },
    methods: {
        setLike: function() {
            this.like = !this.like;
        },
        setQuantity: function(type) {
            if(type == 'add' && this.quantity < this.publication.product.stock)
                this.quantity = this.quantity + 1;
            
            else if(type == 'subtract' && this.quantity > 0)
                this.quantity = this.quantity - 1;
        },
    },

}
</script>

<style lang="css" scoped>

    .publication-container {
        @apply shadow bg-color-secondary-1-1;
        @apply mt-6 p-5 flex flex-col justify-center;
    }

    .product {
        @apply pt-4 pb-6 flex flex-col lg:flex-row gap-6;
        /* @apply bg-blue-300; */
    }
    .images {
        @apply xl:max-w-lg lg:max-w-md;
    }
    .images__main {
        @apply w-full;
    }
    .images__list {
        @apply grid grid-cols-4 gap-4 mt-4;
    }

    .images__single {
        @apply w-full cursor-pointer border;
    }

    .product__name {
        @apply md:text-3xl text-2xl font-medium uppercase mb-2 text-color-secondary-2-0;
    }

    .review {
        @apply flex items-center mb-4;
    }

    .review__stars {
        @apply flex gap-1 text-sm text-yellow-400;
    }

    .review__quantity {
        @apply text-xs text-gray-500 ml-3;
    }

    .product__feature {
        @apply text-gray-800 font-semibold;
    }

    .product__price {
        @apply mt-4 flex items-baseline gap-3;
    }
    .product__value {
        @apply text-color-primary-0 font-semibold text-xl;
    }
    .product__description {
        @apply mt-4 text-gray-600;
    }

    .product__buttons {
        @apply flex gap-3 border-b border-gray-200 pb-5 mt-6;
    }
    
    .option__title {
        @apply text-base text-gray-800 mb-1;
    }

    .product__color {
        @apply text-xs rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm;
        @apply hover:ring-1 ring-color-primary-2;
    }

    .quantity-selector__title {
        @apply text-base text-gray-800 mb-1 flex gap-4 items-center;
    }

    .quantity-selector__title span {
        @apply  text-gray-600 text-xs;
    }
    
    .quantity-selector__content {
        @apply flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max;
    }

    .quantity-selector__button {
        @apply h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none;
        @apply hover:text-color-primary-0 transition-all;
    }

    .quantity-selector__value {
        @apply h-8 px-2 flex items-center justify-center;
        min-width: 40px;
    }

    .share-icons-wrapper {
        @apply flex space-x-3 mt-4;
    }

    .share-icon {
        @apply text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center;
    }
    .questions-section-container {
        @apply mt-8 bg-blue-300 text-color-secondary-2-0;
    }
    .questions-section__title {
        @apply font-semibold text-2xl;
        @apply flex gap-4 items-center py-2;
        @apply bg-green-300;
    }

    .question-entry {
        @apply flex flex-col py-3 ;
        @apply bg-red-300;
        
    }
    .question-entry__input {
        @apply block max-w-lg  ring-1 ring-gray-400  rounded;
        @apply p-3 focus:ring-2  focus:ring-color-primary-2 focus:outline-none;
    }

    .question-entry__label{
        @apply text-lg font-medium mb-2;
    }
    .questions {
        @apply flex flex-col py-3;
    }


</style>