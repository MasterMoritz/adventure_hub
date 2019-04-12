<template>
  <div>
    <v-container>
      <v-layout row justify-center>
        <v-flex xs8 sm6>
          <v-text-field solo box readonly label="Adventure Title" :value="adventureData.title"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>

    <v-divider inset></v-divider>
    <PlayPanel
      :pageId="pageData.id"
    ></PlayPanel>
  </div>
</template>

<script>
// @ is an alias to /src
import PlayPanel from "@/components/PlayPanel.vue";
import gql from "graphql-tag";
import { log } from "util";

export default {
  name: "EditAdventure",
  components: {
    PlayPanel
  },
  data() {
    return {
      gotoPageNr: null
    };
  },
  computed: {
    adventureData() {
      return this.$store.state.play.adventure;
    },
    pageData() {
      return this.$store.state.play.page;
    },
  },
  methods: {
    async gotoPage() {
      this.$store.dispatch("play/changeCurrentPage", {
        apolloClient: this.$apollo,
        pageNr: this.gotoPageNr
      });
    },
  }
};
</script>
