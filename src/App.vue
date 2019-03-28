<template>

  <div id="app">
    <notifications group="global-notification" />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/create">Create Adventure</router-link> | 
      <router-link to="/overview">Overview</router-link>
    </div>
    <div id="header">
     <!-- <img alt="AdventureHub Logo" src="./assets/header.png" /> -->
    </div>
    <router-view />
  </div>
</template>

