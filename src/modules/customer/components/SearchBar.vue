<template>
    <div class="search-bar">
            <input class="search-bar-input" type="text" name="" id="" placeholder="¿Qu&eacute; Est&aacute;s Buscando?">
            <button class="search-bar-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </div>
</template>

<style lang="css" scoped>

.search-bar {
    @apply flex;
    @apply w-40% xs:w-1/2;
}

.search-bar-input {
    @apply h-7 w-full xs:h-10;
    @apply p-2;
    @apply rounded-sm md:rounded-l-sm md:rounded-r-none;
    @apply ring-1 ring-color-primary-0 md:ring-color-primary-2;
}

.search-bar-input:focus {
    @apply border-none outline-none;
}

.search-bar-input::placeholder {
    @apply text-color-secondary-2-3; 
}

.search-bar-input:placeholder-shown {
    @apply overflow-ellipsis; 
}

.search-bar-button{
    @apply bg-color-primary-0 md:bg-color-primary-2;
    @apply px-1 sm:px-2 lg:px-4;
    @apply text-color-secondary-1-1;
    @apply rounded-r-sm;
    @apply ring-1 ring-color-primary-0 md:ring-color-primary-2;
    @apply transition-all duration-150 ease-in-out;
}

.search-bar-button:hover {
    @apply bg-transparent text-color-primary-0 md:text-color-primary-2;
}
</style>