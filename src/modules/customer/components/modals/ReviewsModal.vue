<template>
    <!-- reviews modal window -->
    <Dialog v-model:visible="seeAllReviews" :modal="true" :dismissableMask="true" :maximizable="true">
        <template #header>
            <h3 class="text-2xl font-medium mr-6">Reseñas del producto</h3>
        </template>  
        <div class="reviews max-w-2xl">
            <div >
                <div>
                    <p class=" text-5xl">{{publication.product.average_review}}</p>
                    <div>
                        <div class="review__stars">     
                            <span v-for="(star,index) in publication.product.average_review" :key="index">
                                <i class="fas fa-star"></i>
                            </span>
                        </div>
                    </div>
                    <p>Promedio de reseñas</p>
                </div>          
                <div>
                    <div>
                        <span>5 estrellas</span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div v-for="(review, index) in reviews" :key="index">
                <!-- <div class="questions__question-wrapper">
                    <p>{{question.text}}</p>
                    <div class="questions__answer" v-if="question.answer != null">
                        <svg class="relative top-1" width="12" height="12" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 0V16.5H17" stroke="currentcolor"/>
                        </svg>
                        <span>{{question.answer.text}}<span class="text-xs ml-4">{{question.answer.date}}</span></span>
                    </div>
                </div> -->
            </div>
        </div>       
    </Dialog>
    <!-- reviews modal window end-->
</template>

<script>
export default {
    props: {
        publicationId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            reviews:[
                {
                    date: "2021-12-4",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    stars: 2,
                    text: "Un producto bastante regular",
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    stars: 4,
                    text: "Excelente producto, pero sus materiales no son los mejores",
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
                {
                    date: "2021-12-4",
                    userId: 1,
                    stars: 5,
                    text: "Muy buen producto, ha sido muy util.",
                },
            ],
        }
    },
}
</script>