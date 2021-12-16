<template>
    <div id="nav">
      <router-link to="/"><h1>Movie Polls</h1></router-link>
      <select v-model="selectedSearch" name="" id="">
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