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
    <CreatePanel :pageNumbers="numbers" :pageId="pageData.id" @savePage="updatePage"></CreatePanel>
  </div>
</template>

<script>
// @ is an alias to /src
import CreatePanel from "@/components/CreatePanel.vue";
import gql from "graphql-tag";
import { log } from "util";

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
    pageData() {
      return this.$store.state.edit.page;
    }
  },
  methods: {
    async updatePage(pageData) {
      try {
        //update page
        const result = await this.$apollo.mutate({
          // Query
          mutation: gql`
            mutation(
              $advKey: Int!
              $pageId: Int!
              $pContent: String!
              $pageNr: Int!
              $pageTitle: String!
            ) {
              update_page(
                where: { page_id: { _eq: $pageId } }
                _set: {
                  adventure_key: $advKey
                  content: $pContent
                  page_nr: $pageNr
                  title: $pageTitle
                }
              ) {
                affected_rows
              }
            }
          `,
          // Parameters
          variables: {
            pageId: pageData.page.page_id,
            advKey: this.adventureData.id,
            pContent: pageData.page.content,
            pageNr: pageData.page.page_nr,
            pageTitle: pageData.page.title
          }
        });
        //log("affected rows: " + result.data.update_page.affected_rows);

        //update choices
        var decisionLength = pageData.decisions.update.length;
        for (var i = 0; i < decisionLength; i++) {
          const updateChoiceResult = await this.$apollo.mutate({
            // Query
            mutation: gql`
              mutation(
                $id: Int!
                $content: String!
                $order: Int!
                $toPage: Int
              ) {
                update_decision(
                  where: { id: { _eq: $id } }
                  _set: { content: $content, to_page: $toPage }
                ) {
                  affected_rows
                }
              }
            `,
            // Parameters
            variables: {
              id: pageData.decisions.update[i].id,
              content: pageData.decisions.update[i].content,
              order: pageData.decisions.update[i].sort_order,
              toPage: pageData.decisions.update[i].to_page
            }
          });
        }

        //insert choices
        decisionLength = pageData.decisions.insert.length;
        for (var i = 0; i < decisionLength; i++) {
          const result = await this.$apollo.mutate({
            // Query
            mutation: gql`
              mutation(
                $pageId: Int!
                $content: String!
                $order: Int!
                $toPage: Int
              ) {
                insert_decision(
                  objects: {
                    content: $content
                    page_id: $pageId
                    sort_order: $order
                    to_page: $toPage
                  }
                ) {
                  affected_rows
                }
              }
            `,
            // Parameters
            variables: {
              pageId: pageData.page.page_id,
              content: pageData.decisions.insert[i].content,
              order: pageData.decisions.insert[i].sort_order,
              toPage: pageData.decisions.insert[i].to_page
            }
          });
        }
        decisionLength = pageData.decisions.delete.length;
        for (var i = 0; i < decisionLength; i++) {
          const result = await this.$apollo.mutate({
            // Query
            mutation: gql`
              mutation($id: Int!) {
                delete_decision(where: { id: { _eq: $id } }) {
                  affected_rows
                }
              }
            `,
            // Parameters
            variables: {
              id: pageData.decisions.delete[i].id
            }
          });
        }

        //delete choices
      } catch (err) {
        log(err);
      }
    }
  },
  apollo: {
    numbers: {
      // Simple query that will update the 'hello' vue property
      query: gql`
        query getPagesNumbers($key: Int!) {
          numbers: page(where: { adventure_key: { _eq: $key } }) {
            page_nr
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
