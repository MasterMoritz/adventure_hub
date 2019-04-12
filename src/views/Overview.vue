<template>
  <div class="overviewBody">
    <h1 class="mb-4">Discover all Adventures</h1>

    <Overview title="All Adventures"/>
  </div>
</template>

<script>
import Overview from "@/components/OverviewComponent.vue";

export default {
  name: "OverviewView",
  props: {
    msg: String
  },
  components: {
    Overview
  }
};
</script>


