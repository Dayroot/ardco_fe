<template>
    <div :class="{'container':true, 'open-modal':openModal }">
        <div class="filter">

            <!-- department filter -->
            <div class="mb-5">
                <div class="close-window" @click="openOrCloseModal, $emit('closeModalFilter')">
                    <i class="fas fa-times"></i>
                </div>
                <h3 class="filter__title">departamentos</h3>
                
                <div v-for="(departmentArray, index) in Object.entries(filters.departments)" :key="index">
                    <!-- single department -->
                    <div class="filter__option">
                        <input type="checkbox" 
                            :id="`option-${index}`" 
                            class="checkbox"
                            @click="setActiveFilters('department', departmentArray[0])"
                        />
                        <label :for="`option-${index}`" class="label">{{departmentArray[0]}}</label>
                        <div class="filter__counter">({{departmentArray[1]}})</div>
                    </div>
                    <!-- single department end -->
                </div>
            </div>
            <!-- department filter end -->

             <!-- material filter -->
            <div class="mb-5">
                <div class="close-window" @click="openOrCloseModal, $emit('closeModalFilter')">
                    <i class="fas fa-times"></i>
                </div>
                <h3 class="filter__title">Materia Prima</h3>
                
                <div v-for="(materialArray, index) in Object.entries(filters.materials)" :key="index">
                    <!-- single material -->
                    <div class="filter__option">
                        <input type="checkbox" 
                            :id="`option-${index}`" 
                            class="checkbox"
                            @click="setActiveFilters('material', materialArray[0])"
                        />
                        <label :for="`option-${index}`" class="label">{{materialArray[0]}}</label>
                        <div class="filter__counter">({{materialArray[1]}})</div>
                    </div>
                    <!-- single material end -->
                </div>
            </div>
            <!-- material filter end -->

            <!-- price filter -->
            <div class="mb-5">
                <h3 class="filter__title inline mr-3">Precio:</h3><span class="text-gray-400 text-sm">{{value[0]}} - {{value[1]}}</span>
                <div class="filter__option mt-3">
                    <Slider v-model="value" :range="true" :min="minRange" :max="maxRange" @click="setActiveFilters('price',value)"/>
                </div>
            </div>
            <!-- price filter end -->
            <!-- color filter -->
            <div class="mb-5">
                <h3 class="filter__title">color</h3>
                <div class="filter__option">
                    <div v-for="(color, index) in filters.colors" :key="index">
                        <input
                            type="checkbox"
                            class="filter__color"
                            :style="{'background-color':color}"
                            @click="setActiveFilters('color', color)"
                        />
                    </div>
                </div>
            </div>
            <!-- color filter end -->
        </div>
    </div>
    <div class="back-drop"></div>
</template>

<script>

export default{
    emits: ['closeModalFilter', 'activeFilters'],
    props:{
        products: {
            type: Array,
            required: true
        },
        openModalWindow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            filters: {
                colors: [],
                materials: {},
                departments:{},
            },
            openModal: false,
            activeFilters: {},
            maxRange:0,
            minRange:0,
            value: [0, 0],
        }
    },
    methods: {

        setFilterFields: function(){

            for(let product of this.products){

                //Get color product
                const color = product.features.color || null;
                if( color != null && !this.filters.colors.includes(color) )
                    this.filters.colors.push(color);
                
                //Get product material
                const material = product.features.material || null;
                if( material != null){
                    const materials = Object.keys(this.filters.materials);
                    if(!materials.includes(material))
                        this.filters.materials[material] = 1;
                    else 
                        this.filters.materials[material] += 1;
                }
            
                //Get the department where the product was made
                const department = product.features.department || null;
                if( department != null){
                    const departments = Object.keys(this.filters.departments);
                    if(!departments.includes(department))
                        this.filters.departments[department] = 1;
                    else 
                        this.filters.departments[department] += 1;
                }

                //get price range
                const price = product.price || null;
                if( price != null && price > this.maxRange){
                    this.maxRange = price; 
                    this.value[1] = price; 
                }     
                    
            }
        },
        openOrCloseModal: function(){
            this.openModal = !this.openModal;            
        },

        setActiveFilters: function(key, value) {
            if(key == 'price')
                this.activeFilters[key] = value

            else if( !Object.keys(this.activeFilters).includes(key) )
                    this.activeFilters[key] = [value];
            else {
                const index = this.activeFilters[key].indexOf(value);
                if( index != -1){
                    this.activeFilters[key].splice(index,1);
                    if( !Object.values(this.activeFilters[key]).length)
                        delete this.activeFilters[key];
                }
                else
                    this.activeFilters[key].push(value);
            }
            this.$emit('activeFilters', this.activeFilters);
        },
    },
    watch: {
        openModalWindow: function(){
            this.openOrCloseModal();
        },
        products: function(){
            this.setFilterFields();
        }

    },
    mounted() {
        this.setFilterFields();
    },
}
</script>

<style lang="css" scoped>
    .p-slider-horizontal, .p-inputtext {
    width: 14rem;
}
.p-slider-vertical {
     height: 14rem;
}
    .close-window {
        @apply text-gray-400 text-lg absolute right-4 top-2 cursor-pointer;
        @apply lg:hidden w-6 h-6 rounded-full flex justify-center items-center;
        @apply  transition-all duration-150 ease-in-out;
        @apply hover:bg-color-primary-0 hover:text-color-secondary-2-0;
    }


    .container {
        @apply  w-screen h-screen absolute bg-black bg-opacity-60 z-30 lg:w-auto lg:relative lg:bg-transparent;
        @apply inset-0 lg:inset-auto;
        @apply hidden lg:block;
    }

    .open-modal {
        @apply flex items-center justify-center;
    }
    
    .filter {
        @apply absolute z-30 lg:relative lg:z-0;
        @apply  w-56 2xl:w-64;
        @apply bg-color-secondary-1-1 shadow rounded;
        @apply p-6 lg:px-5 lg:pb-5 lg:pt-3;
    }

    .filter__option {
        @apply flex items-center text-sm mb-2;
    }

    .filter__title {
        @apply text-sm text-color-secondary-2-1 mb-3 uppercase font-medium;
    }

    .filter__counter {
        @apply ml-auto text-gray-600 text-sm;
    }

    .filter__color {
        @apply h-5 w-5 mr-2;
        @apply rounded-full cursor-pointer;
        @apply focus:ring-0 focus:ring-gray-600;
    }

   

    .checkbox {
        @apply text-color-primary-2 rounded-sm cursor-pointer;
        @apply focus:ring-0 focus:ring-gray-600;
    }


    .label {
        @apply text-gray-600 ml-3 cursor-pointer;
    }

    .input-text {
        @apply w-full border-gray-300;
        @apply focus:ring-0 focus:border-color-primary-2;
        @apply px-3 py-1 text-gray-600 text-sm shadow-sm rounded;
    }

    
</style>