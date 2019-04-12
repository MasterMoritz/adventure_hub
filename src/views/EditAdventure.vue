<template>
  <div>
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 sm6>
          <v-text-field outline box readonly label="Adventure Title" :value="adventureData.title"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    
    <v-divider inset></v-divider>
    <CreatePanel :pageNumbers="numbers"></CreatePanel>
  </div>
</template>

<script>
// @ is an alias to /src
import CreatePanel from "@/components/CreatePanel.vue";
import gql from "graphql-tag";

export default {
  name: "EditAdventure",
  components: {
    CreatePanel
  },
  data() {
    return {
      numbers: []
    };
  },
  computed: {
    adventureData() {
      return this.$store.state.edit.adventure;
    },
  },
  apollo: {
    numbers: {
      // Simple query that will update the 'hello' vue property
      query: gql`
        query getPagesNumbers($key: Int!) {
          numbers: page(where: { adventureKey: { _eq: 2 } }) {
            pageNr
          }
        }
      `,
      variables() {
        return {
          key: this.adventureData.id
        };
      }
    }
  }
};
</script>
