<template>
  <NavHeader v-on:onSearch="updateSearch" :polls="feed.polls" :userID="user" :loggedIn="loggedIn"/> 
  <router-view 
    v-on:fetchData="fetchFeedAndGroups" 
    v-if="feed.groups" 
    :userID="user" 
    :isLoggedIn="loggedIn"
    :result="search"
    :communitys="feed.groups" 
    :pollsFeed="feed.polls"
    :joinedCommunitys="joinedCommunitys" />
</template>
<script>
import NavHeader from "./components/NavHeader.vue"
import { auth, initializeData , fetchUsersCommunitys ,loadGroups, publicGroups, db, groupsFeed, pollsFeed } from "./firebase-config"
import { onAuthStateChanged } from "firebase/auth"

export default {
  data() {
    return {
      test: "data",
      loggedIn: false,
      user: "",
      feed: {
      },
      joinedCommunitys: [],
      search: null
    }
  },
  components: {
    NavHeader
  },
  methods: {

    async fetchFeedAndGroups() {
      this.feed = await initializeData()
    },
    updateSearch(input) {
      //console.log("search input App.vue", input)
      this.search = input

      this.$router.push({name: "Search Result"})
    }
  },
  async created(){
    onAuthStateChanged(auth, (user) => {
      if(user) {
        this.loggedIn = true
        this.user = user.uid
      } else {
        this.loggedIn = false
      }
    })
    //Promise resolve gives a object with:
    //all groups that has isPrivate = false 
    //all polls that should be displayed on homepage feed
    this.feed = await initializeData()
  },
  
  }
</script>
<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@import url('https://fonts.googleapis.com/css2?family=Oxygen&display=swap');

//******V-SELECT *******


//******************
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}

*:focus {
  /*Removes focus from input boxes and others*/
}

.card-border {
  border-radius: 10px;
  box-shadow: 0 0 20px 8px #d0d0d0;
}
body {
  background: #f7f7f8;
  
}
a {
  text-decoration: none;
}
#app {
  font-family: 'Oxygen', sans-serif;
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}

#nav {
  background: #fff;
  display: flex;
  height: 10vh;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  top: 0;
}
#nav > * {
  margin: 0 0.5rem;
}

#nav > a > h1 {
  width: 6ch;
  color: #4547e4;
}
#nav > input {
  width: 55%;
  height: 2.5rem;
  border-radius: 5px;
  padding-left: 10px;
  border: none;
  background: #f6f7f8;
}

.menu-buttons {
  display: flex;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
  width: 25%;
}
.menu-buttons > .login {
  min-width: 1.5rem;
  width: 5.5rem;
  height: 2rem;
  border-radius: 25px;
  border: 2px solid #4547e4;
  background: #fff;
  font-weight: bold;
}

.menu-buttons > .signup {
  min-width: 1.5rem;
  width: 5.5rem;
  height: 2rem;
  border-radius: 25px;
  background: #4547e4;
  color: #fff;
  border: none;
  font-weight: bold;
}

.profile-access {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 4.5rem;
}
.profile-menu {
  height: 3rem;
  width: 3rem;
  border: 1px solid black;
  border-radius: 99rem;
}
.login a {
  font-weight: bold;
  color: #4547e4;
}
.signup > a {
  font-weight: bold;
  color: #fff;
} 
@media only screen and (max-width: 725px) {
  .menu-buttons{
    width: 100%;
  }
}

</style>
