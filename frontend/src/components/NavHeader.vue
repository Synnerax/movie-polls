<template>
    <div id="nav">
    <router-link to="/"><h1>Movie Polls</h1></router-link>
    <input type="text" placeholder="Search Archive">
    
    <section v-if="!loggedIn" class="menu-buttons">
    <button class="login"><router-link to="/login"> Login </router-link></button>
    <button v-on:click="testFunc" class="signup"><router-link to="/sign-up">Sign up</router-link></button>
    <div class="profile-access">
    <div  class="profile-menu"></div>
    <i>&or;</i>
    </div>
    </section>
    <section v-else class="menu-buttons">
    <button class="login"><router-link to="/new-pull"> New Poll </router-link></button>
    <button v-on:click="testFunc" class="signup"><router-link to="/groups">Groups</router-link></button>
    <div class="profile-access">
    <div  class="profile-menu"></div>
    <i>&or;</i>
    </div>
    </section>
    
    <!--<router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    -->
  </div>
  
</template>

<script>
import { isLoggedIn } from '../firebase-config'
export default {
  name: "navigation-header",
  props: ["loggedIn"],
  watch: {
    async $route(to, from) {
    // react to route changes...
    console.log("Checking if logged in..")
    
    console.log(await isLoggedIn())
    if (to.name == "Home") {
     
      console.log("-----try rerender", )
    } 
  }
  }
}
</script>

<style>


</style>