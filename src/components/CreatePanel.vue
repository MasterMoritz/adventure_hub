<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <h3>{{title}}</h3>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <div class="adv-panel-img"></div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-textarea v-model="test" box no-resize rows="15"></v-textarea>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs6>
        <div class="adv-panel-choices">{{choices}}</div>
      </v-flex>
    </v-layout>
    <v-layout row>
        
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "CreatePanel",
  data() {
    return {
      test: this.text
    };
  },
  props: {
    title: String,
    text: String,
    choices: String
  }
};
</script>

<style scoped>
</style>


