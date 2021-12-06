<template>
    <Dialog v-model:visible="seeAllQuestions" :modal="true" :dismissableMask="true" :maximizable="true">
        <template #header>
            <h3 class="text-2xl font-medium mr-6">Preguntas</h3>
        </template>
        <div class="questions max-w-2xl">
            <div v-for="(question, index) in questions" :key="index">
                <div class="questions__question-wrapper">
                    <p>{{question.text}}</p>
                    <div class="questions__answer" v-if="question.answer != null">
                        <svg class="relative top-1" width="12" height="12" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 0V16.5H17" stroke="currentcolor"/>
                        </svg>
                        <span>{{question.answer.text}}<span class="text-xs ml-4">{{question.answer.date}}</span></span>
                    </div>
                </div>
            </div>
        </div>   
    </Dialog>
</template>

<script>
export default {
    emits:['closedQuestionModal'],
    props:{
        seeAllQuestions:{
            type: Boolean,
            required: true,
        },
        questions: {
            type: Array,
            required: true,
        }
    },
    watch:{
       seeAllQuestions: function(newVal, oldVal){
           if( newVal == false && oldVal== true){
               this.$emit('closedQuestionModal');
           }
       } 
    }
}
</script>

<style lang="css" >

    .questions {
        @apply flex flex-col py-3 bg-color-secondary-1-1;
    }

    .questions__question-wrapper {
        @apply bg-gray-200 shadow mb-3 px-6 py-3 rounded-md;
        
    }

    .questions__answer{
        @apply text-gray-400 flex gap-2 font-light;
    }

    
</style>