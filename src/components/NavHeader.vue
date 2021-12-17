<template>
    <div id="nav">
      <section class="nav-search-wrapper">
        <router-link to="/"><h1>Movie Polls</h1></router-link>
        <select  v-model="selectedSearch" name="" id="">
          <option value="" disabled selected>Select</option>
          <option value="polls">Poll</option>
          <option value="name">Group</option>
          <option value="genre">Genre</option>
        </select>
        <input 
          @keyup.enter="searchInDB"
          type="text" 
          placeholder="Search Archive"
          v-model="searchWord"  
        >
      </section>
    
      <section v-if="!loggedIn" class="login-signup-options">
        <button class="login"><router-link to="/login"> Login </router-link></button>
        <button v-on:click="testFunc" class="signup"><router-link to="/sign-up">Sign up</router-link></button>
      
      </section>
      <section v-else class="menu-buttons">
        <button v-on:click="toggleGroupOptions" class="show-options-menu">Create or View</button>
        <button v-on:click="testFunc" @click="logOut" class="logout">Log Out</button>
      <section v-show="displayGroupOptions" class="group-options">
        <router-link to="/new-poll" class="link-border"> Create Poll </router-link>
        <router-link to="/new-group" class="link-border">Create Group</router-link>
        <p @click="checkOutGroups" class="link-border">You'r Collection</p>
      </section>
      </section>
  </div>
  
</template>

<script>
import { auth, searchForKeyWord } from "../firebase-config"
import { signOut } from "firebase/auth"
export default {
  name: "navigation-header",
  props: ["loggedIn", "userID", "polls"],
  data() {
    return {
      displayGroupOptions: false,
      searchWord: "",
      selectedSearch: "",
      searchList: [],
    }
  },
  watch: {
    $route(to, from) {
      if(this.displayGroupOptions) {
        this.toggleGroupOptions()
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
      this.$router.push("/")
    },
    toggleGroupOptions() {
      this.displayGroupOptions = !this.displayGroupOptions
    },
    checkOutGroups() {
      this.$router.push({name: "Joined Communitys", params: {id: this.userID}})
    },
    async searchInDB() {
      if(this.selectedSearch === "polls") {
        this.polls.forEach((poll) => {
          if(poll.title === this.searchWord) {
            this.searchList = poll
            return
          }
        })
      } else {
        this.searchList = await searchForKeyWord(this.searchWord, this.selectedSearch)
      }
      this.$emit('onSearch', this.searchList);
    }
  }
}
</script>

<style lang="scss" scoped>

.group-options {
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  top: 45px;
  width: 100%;
  background: #ffffff;
  color: rgb(0, 0, 0);
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  transition: all 2s cubic-bezier(0.25, 0.8, 0.25, 1);
  a {
    color: rgb(0, 0, 0);
  }

}


</style>