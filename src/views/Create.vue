<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <CreatePanel title="MyTestAdventure" text="My Test text <br> \n Trying some stuff out." choices="placeholder"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreatePanel from "@/components/CreatePanel.vue";

export default {
  name: "create",
  components: {
    CreatePanel
  }
};
</script>
