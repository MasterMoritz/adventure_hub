<template>
<v-container>
    <v-layout row wrap>
        <v-flex xs12>
            <h3>{{title}}</h3>
        </v-flex>
        <v-flex xs12>
            <div class="adv-panel-img"></div>
        </v-flex>
        <v-flex xs12>
            <v-textarea rows=20>

            </v-textarea>
                
        </v-flex>
        <v-flex xs12>
            <div class="adv-panel-choices">
                {{choices}}
            </div>
        </v-flex>
    </v-layout>
</v-container>
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


