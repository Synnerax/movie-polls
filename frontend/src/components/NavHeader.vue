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
    <button v-on:click="toggleGroupOptions" class="signup">Groups</button>
    <button v-on:click="testFunc" @click="logOut" class="signup">Log Out</button>
    <section v-if="displayGroupOptions" class="group-options">
      <router-link to="/new-group">Create Group</router-link>
      <p @click="checkOutGroups">Joined Groups</p>
    </section>
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
  props: ["loggedIn", "userID"],
  data() {
    return {
      displayGroupOptions: false
    }
  },
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
    },
    toggleGroupOptions() {
      this.displayGroupOptions = !this.displayGroupOptions
    },
    checkOutGroups() {
      this.$router.push({name: "Joined Communitys", params: {id: this.userID}})
    }
  }
}
</script>

<style lang="scss">

.group-options {
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  top: 25px;
  width: 5.5rem;
  min-height: 4rem;
  background: #4547e4;
  color: #fff;
  a {
    color: #fff;
  }
}
</style>