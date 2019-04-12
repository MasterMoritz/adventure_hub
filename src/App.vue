<template>
  <v-app>
    <notifications group="global-notification" />

    <v-card
    flat
    tile
  >
    <v-toolbar app dense dark class="indigo darken-3">
      <v-toolbar-side-icon id="burgermenu" @click="drawer=!drawer"></v-toolbar-side-icon>

      <v-toolbar-title>Adventure Hub</v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer dark app class="indigo darken-3 mt-5" v-model="drawer" >
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :id="items.id"
          router :to="item.route"
          active-class="indigo lighten-5 grey--text"
          @click="drawer=!drawer"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    </v-card> 
  


    <v-content class="mx-4 mt-4">
    <router-view>    
    <div id="header">
     <!-- <img alt="AdventureHub Logo" src="./assets/header.png" /> -->
    </div>
    </router-view>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data() {
    return{
      drawer: false,
      items: [
        { title: 'Home', icon: 'dashboard', route: '/', id: 'home' },
        { title: 'About', icon: 'account_box', route: '/about', id: 'about' },
        { title: 'Create Adventure', icon: 'gavel' , route: '/create', id: 'create' },
        { title: 'Overview', icon: 'gavel', route: '/overview', id: 'overview' }
      ]
    }
  }
  
}
</script>


