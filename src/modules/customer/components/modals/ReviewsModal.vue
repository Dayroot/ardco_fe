<template>
    <!-- reviews modal window -->
    <Dialog v-model:visible="seeAllReviews" :modal="true" :dismissableMask="true" :maximizable="true" >
        <template #header>
            <h3 class="modal__header">Reseñas del producto</h3>
        </template>  
        <div class="reviews reviews-responsive">
            <div class="reviews__rating">
                <div>
                    <p class=" text-7xl">{{average_review}}</p>
                    <div>
                        <div class="text-xl flex gap-1 text-yellow-400">     
                            <span v-for="(star,index) in average_review" :key="index">
                                <i class="fas fa-star"></i>
                            </span>
                        </div>
                    </div>
                    <p class="text-gray-400">Promedio de reseñas</p>
                </div>

                <div class="flex flex-col gap-1 flex-col-reverse items-center">
                    <div v-for="(rating, index) in Object.keys(reviewsRating)" :key="index">
                        <div class="flex gap-3 items-center text-sm text-gray-400">
                            <span v-if="rating==1" class="mr-2">{{rating}} estrella</span>
                            <span v-else>{{rating}} estrellas</span>
                            <div class="w-32">
                                <ProgressBar :value="reviewsRating[rating][0]" :showValue="false" />
                            </div>
                            <span>{{reviewsRating[rating][1]}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="flex mb-4">
                <button :class="{'button-3':true, 'button-3-active': all}" @click="setReviewsPage('all')">Todas</button>
                <button :class="{'button-3':true, 'button-3-active': positive}" @click="setReviewsPage('positive')">Positivas</button>
                <button :class="{'button-3':true, 'button-3-active': negative}" @click="setReviewsPage('negative')">Negativas</button>
            </nav>
            <div v-for="(review, index) in reviews" :key="index">
                <div class="box-entry">
                    <div class="review__stars">     
                        <span v-for="(star,index) in review.stars" :key="index">
                            <i class="fas fa-star"></i>
                        </span>
                    </div>
                    <p>{{review.text}}<span class="ml-6 text-sm font-light text-gray-400">{{review.date}}</span></p>
                </div>
            </div>
        </div>       
    </Dialog>
    <!-- reviews modal window end-->
</template>

<script>
import moment from 'moment';
export default {
    props: {
        publicationId: {
            type: String,
            required: true
        },
        seeAllReviews: {
            type: Boolean,
            required: true
        },
        average_review: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            reviews:[
                {
                    date: "2020-11-29T21:35:19.897Z",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
                 {
                    date: "2021-09-29T21:35:19.897Z",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
                 {
                    date: "2021-11-29T21:35:19.897Z",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
                 {
                    date: "2021-11-29T21:35:19.897Z",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
                 {
                    date: "2021-11-29T21:35:19.897Z",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
                {
                    date: "2021-11-29T21:35:19.897Z",
                    userId: 1,
                    stars: 2,
                    text: "Un producto bastante regular",
                },
                {
                    date: "2021-11-29T21:35:19.897Z",
                    userId: 1,
                    stars: 4,
                    text: "Excelente producto, pero sus materiales no son los mejores",
                },
                {
                    date: "2021-11-29T21:35:19.897Z",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
                {
                    date: "2021-11-29T21:35:19.897Z",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
                {
                    date: "2021-11-29T21:35:19.897Z",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
                {
                    date: "2021-11-29T21:35:19.897Z",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
            ],
            reviewsRating: {
                1: [0,0],
                2: [0,0],
                3: [0,0],
                4: [0,0],
                5: [0,0]
            },
            positiveReviews:[],
            negativeReviews:[],
            allReviews:[],
            negative: false,
            positive: false,
            all: false,
        }
    },
    methods: {
        

        setReviewsRating: function(){
            for(let review of this.reviews){

                const numb = (1/this.reviews.length)*100;
                const value = Math.round((numb + Number.EPSILON) * 100) / 100;;
                this.reviewsRating[review.stars][0] += value;
                this.reviewsRating[review.stars][1] += 1;

                review.date = moment(review.date,"YYYYMMDD").fromNow();
                if(review.stars >= 3)
                    this.positiveReviews.push(review);
                else
                    this.negativeReviews.push(review);   
            }
            this.reviewsAll = this.reviews;
        },
        setReviewsPage: function(selection){
            if(selection == 'all'){
                this.negative = false;
                this.positive = false;
                this.all = !this.all;
                this.reviews = this.reviewsAll;
            }
            else if(selection == 'positive'){
                this.negative = false;
                this.all = false;
                this.positive = !this.positive;
                this.reviews = this.positiveReviews;
            }
            else if(selection == 'negative'){
                this.positive = false;
                this.all = false;
                this.negative = !this.negative;
                this.reviews = this.negativeReviews;
            }

        }
    },
    watch:{
       seeAllReviews: function(newVal, oldVal){
           if( newVal == false && oldVal== true){
               this.$emit('closedReviewModal');
           }
       } 
    },
    created: function(){
        this.moment = moment;
    },
    mounted() {
        this.setReviewsRating();
    },
}
</script>

<style lang="css">
    .p-progressbar {
        @apply h-1;
    }
    .p-dialog {
        @apply max-w-5xl lg:w-80% sm:h-auto w-screen h-screen m-0;
    }
    .modal__header{
        @apply text-xl xs:text-2xl font-medium xs:mr-6 mr-2;
        @apply  lg:px-4;
    }
    .reviews__rating {
        @apply flex gap-8 mb-8 sm:flex-row flex-col items-start;
    }
    .reviews {
        @apply flex flex-col bg-color-secondary-1-1 py-3 lg:px-4;
        @apply h-screen;
     
    }
    
    /* @media (min-width: 1024px){

        .reviews-responsive {
            min-height: 50vw;
            max-height: 50vw;
        }
    } */
    
</style>