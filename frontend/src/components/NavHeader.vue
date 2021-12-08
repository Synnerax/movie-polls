<template>
    <div id="nav">
    <router-link to="/"><h1>Movie Polls</h1></router-link>
    <input type="text" placeholder="Search Archive">
    
    <section v-if="!loggedIn" class="menu-buttons">
    <button class="login"><router-link to="/login"> Login </router-link></button>
    <button v-on:click="testFunc" class="signup"><router-link to="/sign-up">Sign up</router-link></button>
    
    </section>
    <section v-else class="menu-buttons">
    <button class="login"><router-link to="/new-poll"> New Poll </router-link></button>
    <button v-on:click="testFunc" class="signup"><router-link to="/new-group">Groups</router-link></button>
    <button v-on:click="testFunc" @click="logOut" class="signup">Log Out</button>
    </section>
    
    <!--<router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    -->
  </div>
  
</template>

<script>
import { auth } from "../firebase-config"
import { signOut } from "firebase/auth"
export default {
  name: "navigation-header",
  props: ["loggedIn"],
  watch: {
    async $route(to, from) {
    // react to route changes...
    console.log("Checking if logged in..")
    
    if (to.name == "Home") {
     
      console.log("-----try rerender", )
    } 
  }
  },
  methods: {
    logOut() {
      signOut(auth).then(() => {
      // Sign-out successful.
      console.log("signed out")
      }).catch((error) => {
        // An error happened.
        console.log("not signed in")
      })
      this.$router.push("Home")
    }
  }
}
</script>

<style>


</style>