<template>
  <div class="overviewBody">
    <h1>{{ msg }}</h1>
    <h3>Available Adventures</h3>
    <ul>
      <li>
        <p>Adventure 1</p>
      </li>
      <li>
        <p>Adventure 2</p>
      </li>
      <li>
        <p>Adventure 3</p>
      </li>
    </ul>
    

    
</div>
</template>

<script>
export default {
  name: "List",
  props: {
    msg: String
  },
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #0ed5f2;
}
</style>

