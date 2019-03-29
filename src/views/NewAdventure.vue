<template>
  <NewAdventureForm>
  </NewAdventureForm>
</template>

<script>
// @ is an alias to /src
import NewAdventureForm from "@/components/NewAdventureForm.vue";
import gql from 'graphql-tag';

export default {
  name: "NewAdventure",
  components: {
    NewAdventureForm
  }
};
</script>
