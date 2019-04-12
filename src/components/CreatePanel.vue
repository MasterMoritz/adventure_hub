<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs6 md4>
        <v-text-field label="Page Title (Optional)" v-model="pageTitle"></v-text-field>
      </v-flex>
      <v-flex offset-xs1 xs2 md1>
        <v-text-field type="Number" label="Page Number" v-model="pageNumber"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12>
        <div class="adv-panel-img"></div>
      </v-flex>
    </v-layout>
    <v-layout row justify-center> 
      <v-flex xs12 lg6 md8 justify-center>
        <v-textarea
          label="Text"
          :disabled="!editText"
          v-model="pageContent"
          box
          no-resize
          rows="15"
        ></v-textarea>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 lg6 md8>
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
              <v-text-field outline placeholder="Description" v-model="item.Content"></v-text-field>
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

    <v-btn fab color="indigo accent-4" dark bottom right fixed>
      <v-icon>save</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "CreatePanel",
  data() {
    return {
      pageTitle: "Test",
      pageContent: this.text,
      pageId: 0,
      pageNumber:0,
      editText: true,
      newPages: [],
      decisions: [],
      decicision: {
        Content: String,
        sortOrder: Number,
        toPage: Number
      }
    };
  },
  props: {
    title: String,
    text: String,
    choices: String,
    pageNumbers: Array
  },
  computed: {
    pages() {
      return this.pageNumbers.map(function(obj) {
        return obj.pageNr;
      });
    }
  },
  methods: {
    addChoice() {
      this.decisions.push({
        Content: "",
        sortOrder: this.decisions.length+1,
        toPage: this.pageNumber
      });
    }
  },
  apollo: {
    decisions: {
      // Simple query that will update the 'hello' vue property
      query: gql`
        query getDecisions($key: Int!) {
          decisions:     decision(where: {pageId: {_eq: $key}}, order_by: {sortOrder: asc}) {
            Content
            sortOrder
            toPage
          }
        }
      `,
      variables() {
        return {
          key: this.pageId
        };
      }
    }
  }
};
</script>

<style scoped>
</style>


