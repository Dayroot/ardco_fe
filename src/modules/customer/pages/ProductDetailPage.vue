<template>
    <div class="marginsX-2 publication-container" v-if="publicationbyProductId">
        <!-- product view -->
        <section class="product">       
            <div class="buttons-update">
                <button  class="button-save" @click="updatePublication" v-if="activateEdit">
                    <span>GUARDAR</span>
                </button>
                <div class="edit-button" v-if="editOption" @click="setActivateEdit">
                    <i class="fas fa-edit" v-if="!activateEdit"></i>
                    <span v-else class="text-color-primary-2 hover:text-yellow-700  transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
            </div>
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
                            <div class=" mxs:h-24 mxs:w-24 h-16 w-16">
                                <img 
                                    :src="image.data" alt="" 
                                    class="images__single images__single--thumbnail"
                                    @click="setMainImg(image.data)"
                                >
                            </div>      
                    </template>
                </Carousel>
            </article>
            <!-- product image end -->
            <!-- product content -->
            <article class="max-w-xl">
                <input type="text" 
                    :class="{'product__name':true, 'input-enable':activateEdit, }" 
                    :disabled="!activateEdit" 
                    v-model="publicationbyProductId.product.name"
                />
                <router-link to="" class="review">
                    <div class="review__stars">     
                        <span v-for="(star,index) in integerStars" :key="index">
                            <i class="fas fa-star"></i>
                        </span>
                        <span v-if="decimalStar > 0">
                            <i class="fas fa-star-half"></i>
                        </span>
                    </div>
                    <div class="review__quantity" @click="setSeeAllReviews">({{publicationbyProductId.product.total_reviews}} reseñas)</div>
                </router-link>
                <div class="space-y-2 capitalize">
                    <p class="space-x-2">
                        <span class="product__feature">Disponibilidad: </span>
                        <span class="text-green-600 font-bold">En Stock</span>
                    </p>
                    <p class="flex">
                        <span class="product__feature">Departamento:</span>
                        <input 
                            :class="{'product__feature-value': true, 'input-enable':activateEdit }"
                            :disabled="!activateEdit" 
                            v-model="publicationbyProductId.product.features.department"
                        />
                    </p>
                    <p class="flex">
                        <span class="product__feature">Categoria:</span>
                        <input 
                            :class="{'product__feature-value': true, 'input-enable':activateEdit }"
                            :disabled="!activateEdit" 
                            v-model="publicationbyProductId.product.category.name"
                        />
                    </p>
                    <p class="flex">
                        <span class="product__feature">Material:</span>
                        <input 
                            :class="{'product__feature-value': true, 'input-enable':activateEdit }"
                            :disabled="!activateEdit" 
                            v-model="publicationbyProductId.product.features.material"
                        />
                    </p>
                </div>
                <div class="product__price">
                    <span class="product__value flex">
                        $
                        <input
                            :class="{'product__value': true,'input-enable pl-1 ml-1':activateEdit }"
                            :disabled="!activateEdit"
                            v-model="publicationbyProductId.product.price"
                        />
                    </span>
                    
                    <!-- <span class="text-gray-500 text-base line-through">$500.00</span> -->
                </div>
                <Textarea 
                    :autoResize="true"
                    rows="5"
                    cols="70"
                    :class="{'product__description': true, 'input-enable':activateEdit }"
                    :disabled="!activateEdit" 
                    v-model="publicationbyProductId.description"
                />
                <!-- <p class="product__description">{{publicationbyProductId.description}}</p> -->
            
                <!-- color -->
                <div class="mt-4">
                    <h3 class="option__title">Color</h3>
                    <!-- single color -->
                    <div v-if="activateEdit">
                        <ColorPicker v-model="publicationbyProductId.product.features.color" />
                    </div>
                    <div v-else>
                        <label
                            :style="{'background-color':publicationbyProductId.product.features.color }"
                            class="product__color">
                        </label>
                    </div>
                    <!-- single color end --> 
                </div>
                <!-- color end -->
                <!-- quantity -->
                <div class="mt-4">
                    <div class="quantity-selector__title">
                        <h3>Cantidad</h3>
                        <input
                            v-if="activateEdit"
                            type="number"
                            :class="{ 'input-number-enable  ':activateEdit }"
                            :disabled="!activateEdit" 
                            v-model="publicationbyProductId.product.stock"
                        />
                        <span v-else>({{publicationbyProductId.product.stock}} disponibles)</span>
                    </div>
                    <div :class="{'quantity-selector__content':true, 'pointer-events-none opacity-40':activateEdit}">
                        <div class="quantity-selector__button" @click="setQuantity('subtract')">-</div>
                        <div class="quantity-selector__value">{{quantity}}</div>
                        <div class="quantity-selector__button" @click="setQuantity('add')">+</div>
                    </div>
                </div>
                <!-- color end -->
                <!-- buttons -->
                <div :class="{'product__buttons':true, 'pointer-events-none opacity-40':activateEdit}">
                    <button class="button-1 button-1--v2" @click="setConfirmAddToCart">
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
                <div :class="{'flex space-x-3 mt-4':true, 'pointer-events-none opacity-40':activateEdit}">
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
        <section :class="{'questions-section-container':true, 'pointer-events-none opacity-40':activateEdit}">
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
                        v-model="questionAsked"
                    />
                    <button class="button-1 button-1--v2" @click="sendQuestion">
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
                <button v-if="questionsByPublication.length>4" class="questions__button-open" @click="setSeeAllQuestions">Ver todas las preguntas</button>
                <div v-if="!questionsByPublication.length">
                    <p class="text-gray-400 ">Esta publicación aún no tiene preguntas, sé el primero!</p>
                </div>
            </div>
        </section>
        <!-- questions and answers end-->

        <reviews-modal 
            :publicationId="publicationbyProductId._id"
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
    <Loading 
        v-model:active="isLoading"
        :can-cancel="true"
        :is-full-page="fullPage"
    />
    <ConfirmAddToCartModal
        v-if="publicationbyProductId"
        @closedConfirmAddToCard="confirmAddToCart = false"
        :openConfirmAddToCard="confirmAddToCart"
        :product=" publicationbyProductId.product"
        :quantity="quantity"
    />
</template>

<script>
import jwt_decode from "jwt-decode";
import gql from "graphql-tag";
import { defineAsyncComponent } from 'vue';
import moment from 'moment';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2';

export default {
    props: {
        productId:{
            type: String,
            default: false,
        },
    },
    components:{
        QuestionsModal: defineAsyncComponent(() => import( /* webpackChunkName: "questionsModal" */ '../components/modals/QuestionsModal')),
        ReviewsModal: defineAsyncComponent(() => import( /* webpackChunkName: "reviewsModal" */ '../components/modals/ReviewsModal')),
        Loading,
        ConfirmAddToCartModal: defineAsyncComponent(() => import( /* webpackChunkName: "confirmAddToCartModal" */ '../components/modals/ConfirmAddToCartModal')),
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
            publicationbyProductId: null,
            uneditePublication: null,
            questionsByPublication:[],
            like: false,
            quantity: 0,
            mainImg: "",
            seeAllQuestions: false,
            seeAllReviews: false,
            integerStars:0,
            decimalStar:0,
            activateEdit: false,
            isLoading: true,
            fullPage: true,
            questionAsked: "",
            editOption: false,
            confirmAddToCart: false,
        }
    },
    methods: {
        setConfirmAddToCart: function(){
            if(this.quantity)
                this.confirmAddToCart = true;
            else{
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    text: 'Para agregar el producto, debes especificar la cantidad.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },
        setActivateEdit: function(){
            if(this.activateEdit)
                this.publicationbyProductId = this.uneditePublication;
            this.activateEdit = !this.activateEdit;
        },
        setLike: function() {
            this.like = !this.like;
        },
        setStars: function() {
            const stars = this.publicationbyProductId.product.average_reviews;
            if(stars%1 > 0){
                this.decimalStar = 1;
                this.integerStars = Math.floor(stars);
            }
            else
                this.integerStars = Math.round(stars);
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
        },
        updatePublication: async function(){
            this.isLoading = true;
            await this.$apollo.mutate({
                mutation: gql`
                    mutation($updatePublicationInput: UpdatePublicationInput!) {
                        updatePublication(updatePublicationInput: $updatePublicationInput) {
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
                variables: {
                    updatePublicationInput: {
                        _id: this.publicationbyProductId._id,
                        product: {
                            _id: this.publicationbyProductId.product._id,
                            name: this.publicationbyProductId.product.name,
                            price: Number(this.publicationbyProductId.product.price),
                            stock: Number(this.publicationbyProductId.product.stock),
                            category: {
                                _id: this.publicationbyProductId.product.category._id,
                                name: this.publicationbyProductId.product.category.name,
                            },
                            features: {
                                color: this.publicationbyProductId.product.features.color,
                                material: this.publicationbyProductId.product.features.material,
                                department: this.publicationbyProductId.product.features.department,
                            },
                            imgUrls: this.publicationbyProductId.product.imgUrls,
                            discount: this.publicationbyProductId.product.discount,
                        },
                        userId: Number(this.publicationbyProductId.userId),
                        description: this.publicationbyProductId.description
                    },                      
                },              
            })
            .then(response => {
                this.publicationbyProductId = response.data.updatePublication; 
                this.uneditePublication = response.data.updatePublication;  
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: 'Los cambios han sido guardados!',
                    showConfirmButton: false,
                    timer: 2500
                });
                
            }).catch(e => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: 'Los cambios no han sido guardados!',
                    showConfirmButton: false,
                    timer: 2500
                });
                console.log(JSON.stringify(e, null, 2));
            });
            this.isLoading = false;
        },
        getPublication: async function(){
            await this.$apollo.query({
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
                variables: {
                    productId: this.productId,            
                }
            })
            .then( response => {

                this.publicationbyProductId = {
                     _id: response.data.publicationbyProductId._id,
                    product: {
                        _id: response.data.publicationbyProductId.product._id,
                        name: response.data.publicationbyProductId.product.name,
                        price: Number(response.data.publicationbyProductId.product.price),
                        stock: Number(response.data.publicationbyProductId.product.stock),
                        category: {
                            _id: response.data.publicationbyProductId.product.category._id,
                            name: response.data.publicationbyProductId.product.category.name,
                        },
                        features: {
                            color: response.data.publicationbyProductId.product.features.color,
                            material: response.data.publicationbyProductId.product.features.material,
                            department: response.data.publicationbyProductId.product.features.department,
                        },
                        imgUrls: response.data.publicationbyProductId.product.imgUrls,
                        discount: response.data.publicationbyProductId.product.discount,
                        average_reviews: response.data.publicationbyProductId.product.average_reviews,
                        total_reviews: response.data.publicationbyProductId.product.total_reviews
                    },
                    userId: Number(response.data.publicationbyProductId.userId),
                    description: response.data.publicationbyProductId.description
                };
                this.uneditePublication = {...this.publicationbyProductId};
                this.setMainImg();
                this.setStars();
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            });
        },
        getQuestions: async function(){
            await this.$apollo.query({
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
                variables: {
                    publicationId: this.publicationbyProductId._id,            
                }
            })
            .then( response => {
                this.questionsByPublication = response.data.questionsByPublication;
            })
            .catch(e => {
            console.log(JSON.stringify(e, null, 2));
            });
            this.isLoading = false;
        },
        verifyPublicationOwner: async function(){
            const token = await localStorage.getItem("token_access");
            if ( token ){
                const userId = jwt_decode(token).user_id;
                await this.$apollo.query({
                    query: gql`
                        query ($productId: String!) {
                            productById(productId: $productId) {
                            userId
                            }
                        }
                    `,
                    variables: {
                        productId: this.productId,
                    }
                })
                .then( response => {
                    const ownerId = response.data.productById.userId;
                    if( ownerId == userId )
                        this.editOption = true;
                    else 
                        this.editOption = false;
                })
                .catch(e => {
                    console.log(JSON.stringify(e, null, 2));
                });
            }
        },
        sendQuestion: async function(){
            const token = await localStorage.getItem("token_access");
            if(token){
                this.isLoading = true;
                const userId = jwt_decode(token).user_id;
                await this.$apollo.mutate({
                    mutation: gql`
                        mutation($questionInput: QuestionInput!) {
                            createQuestion(questionInput: $questionInput) {
                                date
                                text
                                answer {
                                    date
                                    text
                                }
                            }
                        }
                    `,
                    variables: {
                        questionInput: {
                            publication: this.publicationbyProductId._id,
                            userId: userId,
                            text: this.questionAsked,
                            status: "por responder"
                        }
                    }
                })
                .then(response => {
                    this.questionAsked = "";
                    this.questionsByPublication = [...this.questionsByPublication, response.data.createQuestion]; 
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        text: 'El vendedor te respondera pronto!',
                        showConfirmButton: false,
                        timer: 2500
                    });
                
                }).catch(e => {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Tu pregunta no ha sido guardada, vuelve a intentarlo nuevamente!',
                        showConfirmButton: false,
                        timer: 2500
                    });
                    console.log(JSON.stringify(e, null, 2));
                });
                this.isLoading = false;
            }else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Necesitas iniciar sesión para realizar una pregunta!',
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        },

    },
    created: async function(){
        this.moment = moment;
        await this.getPublication();
        await this.getQuestions();
        await this.verifyPublicationOwner();
    },

}
</script>

<style lang="css" scoped>

    .publication-container {
        @apply shadow bg-color-secondary-1-1;
        @apply mt-6 p-5 flex flex-col justify-center;
    }

    .product {
        @apply pt-4 pb-6 flex flex-col lg:flex-row gap-6 relative;

    }
    .images {
        @apply xl:max-w-lg lg:max-w-md;
    }
    
    .images__single {
        @apply w-full h-full  object-cover cursor-pointer hover:border-color-primary-2 border border-gray-400;
        
    }
    
    .images__main {
        @apply md:h-112 xs:h-96 w-full mb-4;
    }
 
    .product__name {
        @apply md:text-3xl text-2xl font-medium uppercase mb-2 text-color-secondary-2-0 p-1;
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

    .product__feature-value {
        @apply text-gray-600 px-2 ml-1 w-52 capitalize;
    }
    .product__price {
        @apply mt-4 flex items-baseline gap-3;
    }
    .product__value {
        @apply text-color-primary-0 font-semibold text-xl;
    }
    .product__description {
        @apply mt-4 text-gray-600 border-0;
    }

    .product__buttons {
        @apply flex gap-3 border-b border-gray-200 pb-5 mt-6;
    }
    
    .option__title {
        @apply text-base text-gray-800 mb-1;
    }

    .product__color {
        @apply text-xs rounded-sm h-8 w-8 flex items-center justify-center cursor-pointer;
        @apply hover:ring-1 ring-color-secondary-2-0 transition-all;
    }

    .p-colorpicker  {
        @apply hover:outline-none hover:border-0;
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

    .buttons-update {
      @apply absolute right-0 mr-3 flex cursor-pointer text-gray-400 text-sm;
      @apply border rounded border-gray-300;
    }
    .edit-button {
        @apply hover:text-color-secondary-2-0;
        @apply transition  text-center p-1 px-2 w-8;
    }

    .button-save {
        @apply border-r border-gray-300 hover:text-color-primary-0 transition p-1 px-2 font-medium;
    }

    .input-enable, .input-number-enable {
        @apply bg-gray-200 rounded-sm text-gray-400;
        @apply focus:outline-none focus:ring-1 focus:ring-color-primary-0 shadow ring-1 ring-gray-300;
        @apply flex flex-grow focus:text-color-secondary-2-0;
    }
    .input-number-enable {
        @apply w-12 flex-grow-0 text-center;
    }


</style>