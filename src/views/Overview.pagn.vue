<template>
  <div>
    <List msg="See all Adventures on Adventure Hub"/>
     <v-card-title>
        Adventures
     </v-card-title>  

    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 m6 lg3 v-for="adventure in visibleAdventures" 
          v-bind:visibleAdventures="visibleAdventures" 
          v-bind:currentPage="currentPage" 
          :key="adventure.adventureKey">
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
                <pagination
                  v-bind:adventures="adventure"
                  v-on:page:update="updatePage"
                  v-bind:currentPage="currentPage"
                  v-bind:pageSize="pageSize"
                  >
                </pagination>
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
import Pagination from "@/components/pagination.vue";

export default {
  name: "Overview",
  components: {
    Pagination,
    List
  },
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
  data () {
    return{
    currentPage: 0,
    pageSize: 5,
    visibleAdventures: [],
    advData : []
    };
    props: [
      'currentPage', 'pageSize', 'page'
    ];
  },
  mounted: function(){
    this.updateVisibleAdv();
  },
  
  computed: {

    updatePage(pageNumber){
      this.currentPage = pageNumber;
      this.updateVisibleAdv();
    },

    updateVisibleAdv(){
     
      this.visibleAdventures = this.advData.slice(this.currentPage * this.pageSize,(this.currentPage * this.pageSize) + this.pageSize);
      if(this.visibleAdventures.length == 0 && this.currentPage > 0){
        this.updatePage(this.currentPage -1);
      }
      }
  }
}
</script>