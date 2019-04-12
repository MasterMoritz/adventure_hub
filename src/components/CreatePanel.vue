<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs9 md8 lg6>
        <v-text-field label="Page Title (Optional)" v-model="page.title"></v-text-field>
      </v-flex>
      <v-flex offset-xs1 xs2 md1 lg1>
        <v-text-field type="Number" label="Page Number" v-model="page.page_nr"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12>
        <div class="adv-panel-img"></div>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 lg8 md10 justify-center>
        <v-textarea
          label="Text"
          :disabled="!editText"
          v-model="page.content"
          box
          no-resize
          rows="15"
        ></v-textarea>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 lg8 md10>
        <v-card dark>
          <v-card-title primary-title>
            <p>Choices</p>
          </v-card-title>
          <v-btn fab small color="indigo accent-3" bottom left absolute dark @click="addChoice">
            <v-icon>add</v-icon>
          </v-btn>
        </v-card>
        <v-list dark two-line>
          <v-list-tile v-for="(item) in decisions" :key="item.sortOrder">
            <v-list-tile-content>
              <v-text-field box placeholder="Description" v-model="item.Content"></v-text-field>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-autocomplete
                v-model="item.toPage"
                hint="Link this choice to a page"
                persistent-hint
                :items="pages"
                prepend-icon="pages"
                solo
              ></v-autocomplete>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>

    <v-btn fab color="indigo accent-4" dark bottom right fixed @click="savePage">
      <v-icon>save</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

import { log } from "util";
export default {
  name: "CreatePanel",
  data() {
    return {
      pageTitle: "Test",
      pageContent: this.text,
      pageNumber: 0,
      editText: true,
      newPages: [],
      decisions: [],
      page: {
        page_nr: null,
        content: "",
        title: ""
      }
    };
  },
  props: {
    pageNumbers: Array,
    pageId: Number
  },
  computed: {
    pages() {
      return this.pageNumbers.map(function(obj) {
        return obj.page_nr;
      });
    }
  },
  methods: {
    addChoice() {
      this.decisions.push({
        Content: "",
        sortOrder: this.decisions.length + 1,
        toPage: this.pageNumber
      });
    },
    async savePage() {
      this.$emit('savePage', )
    }
  },
  apollo: {
    pageData: {
      // Simple query that will update the 'hello' vue property
      query: gql`
        query getDecisions($key: Int!) {
          decisions: decision(
            where: { pageId: { _eq: $key } }
            order_by: { sortOrder: asc }
          ) {
            Content
            sortOrder
            toPage
          }
          page: page_by_pk(page_id: $key) {
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


