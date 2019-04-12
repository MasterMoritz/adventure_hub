<template>
  <div>
    <List msg="See all Adventures on Adventure Hub"/>
    <v-card>
      <v-card>
        <v-card-text>
          <v-card-title>
            Adventures
            <v-spacer></v-spacer>
            <v-text-field
              :append-icon="search?'close':'search'"
              :append-icon-cb="() => (search = '')"
              @keydown.native.escape="search=''"
              label="Search"
              single-line
              hide-details
              
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <div>
            <v-data-table 
            v-bind:items="items" 
            v-bind:search="search"
            v-bind:pagination.sync="pagination" hide-actions
            >
              <template v-slot:items="props">
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
                                  <span>{{adventure.description}}</span>
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
              </template>
            </v-data-table>
          </div>
          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
          </div>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
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
  },
  data() {
    return {
      search: "",
      pagination: {},
      selected: [],
      items: [
        {
        
        }
      ]
    };
  },
  computed: {
    pages() {
      return this.pagination.rowsPerPage
        ? Math.ceil(this.items.length / this.pagination.rowsPerPage)
        : 5;
    }
  },
 
  methods: {}
};
</script>
