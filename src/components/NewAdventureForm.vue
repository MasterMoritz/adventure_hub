<template>
  <v-form v-on:submit.prevent="console.log(form)">
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 sm6 md4>
          <v-text-field label="Title" v-model="title">

          </v-text-field>
          
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs1 align-center>
          <v-btn>
              Create
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "NewAdventureForm",
  data() {
    return {
      title: ""
    };
  }
};
</script>