<template>
  <div class="overviewBody">
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


