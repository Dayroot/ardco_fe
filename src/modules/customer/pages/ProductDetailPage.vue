<template>
    <div class="marginsX-2 publication-container">
        <!-- product view -->
        <section class="product">
            <!-- product image -->
            <article class="images">
                <div class="images__main">
                    <img :src="mainImg" class="images__single">
                </div>
                <Carousel 
                    :value="publicationbyProductId.product.imgUrls" 
                    :numVisible="4" 
                    :numScroll="1" 
                    :responsiveOptions="responsiveOptions" 
                    :circular="true" 
                    :autoplayInterval="3000"
                >         
                    <template #item="image">
                            <div 
                                class=" mxs:h-24 mxs:w-24 h-16 w-16">
                                <img :src="image.data" alt="" class="images__single images__single--thumbnail"
                                @click="setMainImg(image.data)"
                            >
                            </div>      
                    </template>
                </Carousel>
            </article>
            <!-- product image end -->
            <!-- product content -->
            <article class="max-w-xl">
                <h2 class="product__name">{{publicationbyProductId.product.name}}</h2>
                <router-link to="" class="review">
                    <div class="review__stars">     
                        <span v-for="(star,index) in publicationbyProductId.product.average_reviews" :key="index">
                            <i class="fas fa-star"></i>
                        </span>
                    </div>
                    <div class="review__quantity" @click="setSeeAllReviews">({{publicationbyProductId.product.total_reviews}} reseñas)</div>
                </router-link>
                <div class="space-y-2 capitalize">
                    <p class="space-x-2">
                        <span class="product__feature">Disponibilidad: </span>
                        <span class="text-green-600 font-bold">En Stock</span>
                    </p>
                    <p class="space-x-2">
                        <span class="product__feature">Departamento: </span>
                        <span class="text-gray-600">{{publicationbyProductId.product.features.department}}</span>
                    </p>
                    <p class="space-x-2">
                        <span class="product__feature">Categoria: </span>
                        <span class="text-gray-600">{{publicationbyProductId.product.category.name}}</span>
                    </p>
                    <p class="space-x-2">
                        <span class="product__feature">Material: </span>
                        <span class="text-gray-600">{{publicationbyProductId.product.features.material}}</span>
                    </p>
                </div>
                <div class="product__price">
                    <span class="product__value">${{publicationbyProductId.product.price}}</span>
                    <!-- <span class="text-gray-500 text-base line-through">$500.00</span> -->
                </div>
                <p class="product__description">{{publicationbyProductId.description}}</p>
            
                <!-- color -->
                <div class="mt-4">
                    <h3 class="option__title">Color</h3>
                    <!-- single color -->
                    <div>
                        <label :style="{'background-color':publicationbyProductId.product.features.color }"
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
                        <span>({{publicationbyProductId.product.stock}} disponibles)</span>
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
                <div class="flex gap-6">
                    <Textarea
                        :autoResize="true"
                        rows="1"
                        cols="100"
                        class="question-entry__input"
                        placeholder="Escribe tu pregunta..."
                    />
                    <button class="button-1 button-1--v2">
                        <span class="mr-2">PREGUNTAR</span>
                    </button>
                </div>
            </div>    
            <div class="questions">
                <label class="question-entry__label">Últimas preguntas</label>
                <div v-for="(question, index) in questionsByPublication.slice(0,5)" :key="index">
                    <div class="box-entry">
                        <p>{{question.text}}</p>
                        <div class="questions__answer" v-if="question.answer != null">
                            <svg class="relative top-1" width="12" height="12" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.5 0V16.5H17" stroke="currentcolor"/>
                            </svg>
                            <span>{{question.answer.text}}<span class="text-xs ml-4">{{moment(question.answer.date).format("DD/MM/YYYY ")}}</span></span>
                        </div>
                    </div>
                </div>
                <button 
                class="questions__button-open" @click="setSeeAllQuestions">Ver todas las preguntas</button>
            </div>
        </section>
        <!-- questions and answers end-->

        <reviews-modal 
            :publicationId="publicationbyProductId.product._id"
            :average_reviews="publicationbyProductId.product.average_reviews"
            :seeAllReviews="seeAllReviews"
            @closedReviewModal="setSeeAllReviews"
        ></reviews-modal>

        <questions-modal
            :seeAllQuestions="seeAllQuestions"
            :questions="questionsByPublication"
            @closedQuestionModal="setSeeAllQuestions"
        ></questions-modal>
        
    </div>
</template>

<script>
import gql from "graphql-tag";
import { defineAsyncComponent } from 'vue';
import moment from 'moment';

export default {
    props: {
        productId:{
            type: String,
            // required: true,
            default: "61aedaad51bb46f11ffb3b1b"        
        },
        editOption:{
            type: Boolean,
            default: false,
        }

    },
    components:{
        QuestionsModal: defineAsyncComponent(() => import( /* webpackChunkName: "questionsModal" */ '../components/modals/QuestionsModal')),
        ReviewsModal: defineAsyncComponent(() => import( /* webpackChunkName: "reviewsModal" */ '../components/modals/ReviewsModal')),
    },
    data() {
        return {
            responsiveOptions: [
            {
				breakpoint: '1280px',
				numVisible: 4,
				numScroll: 1
			},
            {
				breakpoint: '1024px',
				numVisible: 3,
				numScroll: 1
			},
            {
				breakpoint: '768px',
				numVisible: 5,
				numScroll: 1
			},
			{
				breakpoint: '640px',
				numVisible: 4,
				numScroll: 1
			},
			{
				breakpoint: '480px',
				numVisible: 3,
				numScroll: 1
			},
        
            {
				breakpoint: '320px',
				numVisible: 2,
				numScroll: 1
			},

		    ],
            publicationbyProductId:{
                _id: "",
                product: {
                    _id:"",
                    name:"", 
                    price: 0,
                    stock: 0, 
                    sold: 0,
                    category: {
                        _id:"",
                        name:"",
                    }, 
                    features: {
                            color:"",
                            material:"",
                            department:"",
                    },
                    imgUrls: [], 
                    average_reviews: 0,
                    total_reviews: 0,
                    discount: 0,
                },
                userId: 0,
                publication_date: "",
                description: ""
            },
            questionsByPublication:[],
            like: false,
            quantity: 0,
            mainImg: "",
            seeAllQuestions: false,
            seeAllReviews: false,
        }
    },
    apollo: {
        publicationbyProductId: {
            query: gql`
                query ($productId: String!) {
                    publicationbyProductId(productId: $productId) {
                        _id
                        product {
                            _id
                            name
                            price
                            stock 
                            sold
                            category {
                                _id
                                name
                            }
                            features {
                                color
                                material
                                department
                            }
                            imgUrls 
                            average_reviews
                            total_reviews
                            discount
                        }
                        userId
                        publication_date
                        description
                    }
                }
            `,
            variables(){
                return {
                    productId: this.productId,
                };
            }
        },
        questionsByPublication: {
            query: gql`
                query ($publicationId: String!) {
                    questionsByPublication(publicationId: $publicationId) {
                         _id
                        date
                        text
                        answer {
                            _id
                            date
                            text
                        } 
                    }
                }
            `,
            variables(){
                return {
                    publicationId: this.publicationbyProductId._id,
                };
            }
        },
    },
    methods: {
        setLike: function() {
            this.like = !this.like;
        },
        setQuantity: function(type) {
            if(type == 'add' && this.quantity < this.publicationbyProductId.product.stock)
                this.quantity = this.quantity + 1;
            
            else if(type == 'subtract' && this.quantity > 0)
                this.quantity = this.quantity - 1;
        },
        setMainImg: function(img){
            if(img == null)
                 this.mainImg = this.publicationbyProductId.product.imgUrls[0];
            else    
                this.mainImg = img;
        },
        setSeeAllQuestions: function(){
            this.seeAllQuestions = !this.seeAllQuestions;
        },
        setSeeAllReviews: function(){
            this.seeAllReviews = !this.seeAllReviews
        }
    },
    created: function(){
        this.moment = moment;
    },
    mounted() {
        this.setMainImg();
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

    }
    .images {
        @apply xl:max-w-lg lg:max-w-md;
    }
    
    .images__single {
        @apply w-full h-full object-cover cursor-pointer hover:border-color-primary-2 border border-gray-400;
        
    }
    
    .images__main {
        @apply md:h-112 xs:h-96 w-full mb-4;
    }
 
    .product__name {
        @apply md:text-3xl text-2xl font-medium uppercase mb-2 text-color-secondary-2-0;
    }

    .review {
        @apply flex items-center mb-4;
    }

    .review__quantity {
        @apply text-xs text-gray-500 ml-3 hover:text-color-primary-0;
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
        @apply mt-8 text-color-secondary-2-0;
    }
    .questions-section__title {
        @apply font-semibold text-2xl;
        @apply flex gap-4 items-center py-2;
    }

    .question-entry {
        @apply flex flex-col py-3 ;
        
    }
    .question-entry__input {
        @apply block max-w-lg  ring-0 ring-gray-400  rounded;
        @apply hover:border-gray-400;
        @apply p-2 focus:ring-color-primary-2  focus:ring-2 focus:border-transparent;
    }

    .question-entry__label{
        @apply text-lg font-medium mb-2;
    }
    
    .questions__button-open {
        @apply text-color-primary-2 cursor-pointer hover:text-color-primary-0 w-40 ml-6;
    }


</style>