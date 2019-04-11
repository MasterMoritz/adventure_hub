<template>
  <div>
    MyId: {{adventureData.id}}
    <div>MyTitle: {{adventureData.title}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import gql from "graphql-tag";

export default {
  name: "EditAdventure",
  components: {},
  computed: {
    adventureData() {
      return this.$store.state.edit.adventure;
    }
  }
};
</script>
