<template>
  <div>
    <h1 class="mb-4">Discover all Adventures</h1>

    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 m6 lg3 v-for="adventure in advData" :key="adventure.adventureKey">
            <v-card color="indigo lighten-4" class="black--text">
              <v-layout>
                <v-flex xs5 v-if="adventure.image!== null">
                  <v-img :src="adventure.image" height="125px" contain></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{adventure.name}}</div>
                      <span>ID: {{adventure.adventureKey}}</span>
                      <span>{{adventure.description}}</span>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions>
                <v-layout justify-space-around>
                  <v-btn @click="play(adventure.adventureKey)" flat>Play</v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>


<script>
// @ is an alias to /src
import gql from "graphql-tag";
import { log } from "util";

export default {
  name: "Overview",
  apollo: {
    // Simple query that will update the 'advData' vue property
    advData: gql`
      query {
        advData: adventure {
          adventureKey
          name
          image
          description
        }
      }
    `
  },
  methods: {
    async play(value) {
      await this.$store.dispatch('play/currentAdventure', {apolloClient: this.$apollo, id: value});
        this.$router.push({name:'playAdventure', params: {adventureId:value}});
    }
  }
};
</script>