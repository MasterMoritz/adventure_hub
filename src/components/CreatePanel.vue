<template>
  <v-container>
    <v-layout row>
      <v-flex xs8 md6>
        <v-text-field label="Page Title (Optional)" v-model="pageTitle"></v-text-field>
      </v-flex>
      <v-flex offset-xs1 xs2 md1>
        <v-text-field type="Number" label="Page Number" v-model="pageNumber"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <div class="adv-panel-img"></div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs11>
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
    <v-layout row>
      <v-flex xs12 lg6 md8>
        <v-list dark two-line>
          <v-list-tile v-for="(item, index) in pages" :key="item">
            <v-list-tile-content>
              <v-list-tile-title v-text="item"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-autocomplete
                v-model="newPages[index]"
                hint="Link this choice to a page"
                persistent-hint
                :items="pages"
                prepend-icon="pages"
                solo
              ></v-autocomplete>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <div class="adv-panel-choices">{{choices}}</div>
      </v-flex>
    </v-layout>
    <v-layout row></v-layout>
  </v-container>
</template>

<script>
import { log } from "util";

export default {
  name: "CreatePanel",
  data() {
    return {
      pageTitle: "Test",
      pageContent: this.text,
      pageNumber: 0,
      editText: true,
      newPages: []
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
      log(this.pageNumbers);
      return this.pageNumbers.map(function(obj) {
        return obj.pageNr;
      });
    }
  }
};
</script>

<style scoped>
</style>


