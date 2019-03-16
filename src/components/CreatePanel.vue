<template>
<div class="adv-panel-content">
    <div class="adv-panel-title">
        <h3>{{title}}</h3>
    </div>
    <hr>
    <div class="adv-panel-img"></div>
    <hr>
    <div class="adv-panel-text">
        {{text}}
    </div>
    <hr>
    <div class="adv-panel-choices">
        {{choices}}
    </div>
</div>
</template>

<script>
export default {
    name: "CreatePanel",
    props: {
        title:String,
        text:String,
        choices:String
    }
}
</script>

<style scoped>

</style>


