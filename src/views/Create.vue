<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <CreatePanel title="MyTestAdventure" text="My Test text <br> \n Trying some stuff out." choices="placeholder"/>
      <div class="example">
        sample adventures graphQL query:
        <ul>
          <li v-for="adventure in hello" :key="adventure.adventureKey">
            id:{{adventure.adventureKey}}, name:{{adventure.name}}</li>
        </ul>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CreatePanel from "@/components/CreatePanel.vue";
import gql from 'graphql-tag';

export default {
  name: "create",
  apollo: {
    // Simple query that will update the 'hello' vue property
    hello: gql`query {
      hello: adventure {
        adventureKey,
        name
      }
    }`,
  },
  components: {
    CreatePanel
  }
};
</script>
