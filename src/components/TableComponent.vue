<script setup lang="ts">
defineProps({ type: String })


</script>


<template>
    <svg viewBox="0 0 507.2 507.2" v-if="type === 'checked'">
        <g>
            <circle cx="253.6" cy="253.6" r="253.6" fill="#32ba7c"></circle>
            <path d="m188.8 368 130.4 130.4c108-28.8 188-127.2 188-244.8v-7.2L404.8 152l-216 216z" fill="#0aa06e"></path>
            <path d="M260 310.4c11.2 11.2 11.2 30.4 0 41.6l-23.2 23.2c-11.2 11.2-30.4 11.2-41.6 0L93.6 272.8c-11.2-11.2-11.2-30.4 0-41.6l23.2-23.2c11.2-11.2 30.4-11.2 41.6 0L260 310.4z" fill="#ffffff"></path>
            <path d="M348.8 133.6c11.2-11.2 30.4-11.2 41.6 0l23.2 23.2c11.2 11.2 11.2 30.4 0 41.6l-176 175.2c-11.2 11.2-30.4 11.2-41.6 0l-23.2-23.2c-11.2-11.2-11.2-30.4 0-41.6l176-175.2z" fill="#ffffff"></path>
        </g>
    </svg>
    <svg viewBox="0 0 507.2 507.2" v-else-if="type === 'cross'">
        <g>
            <circle cx="253.6" cy="253.6" r="253.6" fill="#f15249"></circle>
            <path d="M147.2 368 284 504.8c115.2-13.6 206.4-104 220.8-219.2L367.2 148l-220 220z" fill="#ad0e0e"></path>
            <path d="M373.6 309.6c11.2 11.2 11.2 30.4 0 41.6l-22.4 22.4c-11.2 11.2-30.4 11.2-41.6 0l-176-176c-11.2-11.2-11.2-30.4 0-41.6l23.2-23.2c11.2-11.2 30.4-11.2 41.6 0l175.2 176.8z" fill="#ffffff"></path>
            <path d="M280.8 216 216 280.8l93.6 92.8c11.2 11.2 30.4 11.2 41.6 0l23.2-23.2c11.2-11.2 11.2-30.4 0-41.6L280.8 216z" fill="#d6d6d6"></path>
            <path d="M309.6 133.6c11.2-11.2 30.4-11.2 41.6 0l23.2 23.2c11.2 11.2 11.2 30.4 0 41.6L197.6 373.6c-11.2 11.2-30.4 11.2-41.6 0l-22.4-22.4c-11.2-11.2-11.2-30.4 0-41.6l176-176z" fill="#ffffff"></path>
        </g>
    </svg>
    <slot v-else></slot>
</template>

<style scoped>svg {
    width: 2rem;
    aspect-ratio: 1/1;
}</style>