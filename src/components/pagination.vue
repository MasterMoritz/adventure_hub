<template>
    <div v-if="totalPages() >0" class="pagination-wtapper">
        <span v-if="showPreviousLink()" class="pagination-btn" v-on:click="updatePage(currentPage -1)"> Prev </span>
        {{ currentPage + 1}} of[{{totalPages()}}]
        <span v-if="showNextLink()" class="pagination-btn" v-on:click="updatePage(currentPage +1)"> Next </span>

    </div>

</template>

<script src="./pagination.js"></script>
<style>

</style>




