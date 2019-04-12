<template>
  <v-form v-on:submit.prevent="console.log(form)">
    <v-alert
      :value="error"
      type="error"
      transition="scale-transition"
    >Oops, something went wrong. Please try again.</v-alert>
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 sm8 md6 lg4>
          <v-text-field label="Title" v-model="title"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
      <v-flex xs12 sm8 md6 lg4 justify-center>
        <v-textarea
          label="Description"
          v-model="description"
          box
          no-resize
          rows="10"
        ></v-textarea>
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
import { log } from 'util';

export default {
  name: "NewAdventureForm",
  data() {
    return {
      title: "",
      loading: false,
      error: false,
      description: ""
    };
  },
  methods: {
    async createAdventure() {
      this.loading = true;
      try {
        const result = await this.$apollo.mutate({
          // Query
          mutation: gql`
            mutation($name: String!, $description: String) {
              insert_adventure(objects: { name: $name, description: $description }) {
                returning {
                  adventureKey,
                  name
                }
              }
            }
          `,
          // Parameters
          variables: {
            name: this.title,
            description: this.description
          }
        });

        // Result
        this.error = false;
        var createdKey = result.data["insert_adventure"]["returning"][0]["adventureKey"];
        
        //generate first page
        const resultPage = await this.$apollo.mutate({
          // Query
          mutation: gql`
            mutation($advKey: Int!) {
              insert_page(objects: {content: "", page_nr: 1, title: "Chapter 1", adventure_key: $advKey, is_start_page: true}) {
                returning {
                  page_id
                }
              }
            }
          `,
          // Parameters
          variables: {
            advKey: createdKey
          }
        });
        //update store state
        await this.$store.dispatch('edit/currentAdventure', {apolloClient: this.$apollo, id: createdKey});
        this.$router.push({name:'editAdventure', params: {adventureId:createdKey}});

      } catch (err) {
        log(err);
        this.error = true;
      }

      this.loading = false;
    }
  }
};
</script>