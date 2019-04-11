<template>
  <div>
    <List msg="See all Adventures on Adventure Hub"/>

    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 m6 lg3 v-for="adventure in hello" :key="adventure.adventureKey">
            <v-card color="cyan darken-2" class="white--text">
              <v-layout>
                <v-flex xs5>
                  <v-img :src="adventure.image" height="125px" contain></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{adventure.name}}</div>
                      <span>ID: {{adventure.adventureKey}}</span>
                      <span> {{adventure.description}}</span>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions>
                  <v-btn flat dark>Discover now</v-btn>
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
import List from "@/components/OverviewComponent.vue";
import gql from "graphql-tag";

export default {
  name: "Overview",
  components: {
    List
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    hello: gql`
      query {
        hello: adventure {
          adventureKey
          name
          image
          description
        }
      }
    `
  }
};
</script>
