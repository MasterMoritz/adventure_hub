<template>
  <div>
    <List msg="See all Adventures on Adventure Hub" />
    
    <ol>
        <li v-for="todo in todos" :key="todo.text">
        {{ todo.text }}
        </li>
    </ol>


  </div>
</template>

<script>
// @ is an alias to /src
import List from "@/components/OverviewComponent.vue";

export default {
  name: "Overview",
  components: {
    List
  },
  data: function() {
    const props = {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]};
    
    return props;
  },
};
</script>
