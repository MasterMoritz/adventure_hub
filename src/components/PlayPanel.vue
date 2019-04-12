<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span>{{page.title}}</span>
      </v-card-title>
      <v-card-text>
        <div class="adventure-text">
          {{page.content}}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="changePage(item.to_page)" v-for="(item, index) in decisions" :key="index" flat color="deep-orange darken-1">{{item.content}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
  
</template>

<script>
import gql from "graphql-tag";

import { log } from "util";
export default {
  name: "CreatePanel",
  data() {
    return {
      decisions: [],
      page: {
        page_id: this.pageId,
        page_nr: null,
        content: "",
        title: "",
        toggle_none: null
      }
    };
  },
  props: {
    pageId: Number
  },
  methods: {
    async changePage(value) {
      await this.$store.dispatch("play/changeCurrentPage", {
        apolloClient: this.$apollo,
        pageNr: value
      });
    }
  },
  watch: {
    pageId: function(newVal, oldVal) {
      this.$apollo.queries.pageData.refetch();
    }
  },
  apollo: {
    pageData: {
      query: gql`
        query getDecisions($key: Int!) {
          decisions: decision(
            where: { page_id: { _eq: $key } }
            order_by: { sort_order: asc }
          ) {
            id
            content
            sort_order
            to_page
          }
          page: page_by_pk(page_id: $key) {
            page_id
            page_nr
            content
            title
          }
        }
      `,
      variables() {
        return {
          key: this.pageId
        };
      },
      update(data) {
        return { decisions: data.decisions, page: data.page };
      },
      manual:true,
      result(data) {
        this.decisions = data.data.decisions;
        if (data.data.page !== null) {
          this.page = data.data.page;
        }
      }
    }
  }
};
</script>

<style scoped>
</style>


