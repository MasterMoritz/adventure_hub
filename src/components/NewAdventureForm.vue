<template>
  <v-form v-on:submit.prevent="console.log(form)">
    <v-alert
      :value="error"
      type="error"
      transition="scale-transition"
    >Oops, something went wrong. Please try again.</v-alert>
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 sm6 md4>
          <v-text-field label="Title" v-model="title"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs1 align-center>
          <v-btn icon flat color="indigo accent-3" :loading="loading" @click="createAdventure">
            <v-icon large>check_circle_outline</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "NewAdventureForm",
  data() {
    return {
      title: "",
      loading: false,
      error: false
    };
  },
  methods: {
    async createAdventure() {
      this.loading = true;
      try {
        const result = await this.$apollo.mutate({
          // Query
          mutation: gql`
            mutation($name: String!) {
              insert_adventure(objects: { name: $name }) {
                returning {
                  adventureKey
                }
              }
            }
          `,
          // Parameters
          variables: {
            name: this.title
          }
        });

        // Result
        this.error = false;
        alert(
          "i got clicked! new key = " +
            result.data["insert_adventure"]["returning"][0]["adventureKey"]
        );
      } catch (err) {
        this.error = true;
      }

      this.loading = false;
    }
  }
};
</script>