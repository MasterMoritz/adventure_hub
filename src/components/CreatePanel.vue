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
          <v-list-tile v-for="(item, index) in decisions" :key="index">
            <v-list-tile-avatar>
              <v-icon color="indigo accent-1" @click="removeChoice(index)">delete</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-text-field box placeholder="Description" v-model="item.content"></v-text-field>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-autocomplete
                v-model="item.to_page"
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

    <v-speed-dial fixed bottom right>
      <template v-slot:activator>
        <v-btn small fab color="indigo accent-4" dark @click="addPage">
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn fab color="indigo accent-4" dark @click="savePage">
          <v-icon>save</v-icon>
        </v-btn>
      </template>
    </v-speed-dial>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

import { log } from "util";
export default {
  name: "CreatePanel",
  data() {
    return {
      editText: true,
      decisions: [],
      deletedDecisions: [],
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
  watch: {
    pageId: function(newVal, oldVal) {
      this.deletedDecisions = [];
      this.$apollo.queries.pageData.refetch();
    }
  },
  methods: {
    async addPage() {
      this.$emit("newPage");
    },
    addChoice() {
      var choice = {
        content: "",
        sort_order: this.decisions.length + 1,
        to_page: this.pageNumber,
        isNew: true
      };
      this.decisions.push(choice);
    },
    removeChoice(index) {
      if (this.decisions[index].isNew !== true) {
        this.deletedDecisions.push(this.decisions[index]);
      }
      this.decisions.splice(index, 1);
    },
    async savePage() {
      var updateDecisions = this.decisions.filter(function(element) {
        return element.isNew !== true;
      });
      var insertDecisions = this.decisions.filter(function(element) {
        return element.isNew === true;
      });
      this.$emit("savePage", {
        page: this.page,
        decisions: {
          update: updateDecisions,
          insert: insertDecisions,
          delete: this.deletedDecisions
        }
      });
      this.deletedDecisions = [];
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


