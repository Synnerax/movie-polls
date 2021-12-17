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
    :joinedCommunitys="joinedCommunitys" 
    :provider="provider"
    :email="email"
    :currentUser="currentUser"
    />
</template>
<script>
import NavHeader from "./components/NavHeader.vue"
import { auth, initializeData } from "./firebase-config"
import { onAuthStateChanged } from "firebase/auth"

export default {
  data() {  
    return {
      loggedIn: false,
      user: "",
      feed: {
      },
      joinedCommunitys: [],
      search: null,
      provider: null,
      email: "",
      currentUser: null
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
      this.search = input

      this.$router.push({name: "Search Result"})
    }
  },
  async created(){
    onAuthStateChanged(auth, (user) => {
      if(user) {
        this.loggedIn = true
        this.user = user.uid
        this.provider = user.providerData[0].providerId
        this.email = user.email
        this.currentUser = user
      } else {
        this.loggedIn = false
      }
    })
    //Promise resolve gives a object with:
    //all groups that has isPrivate = false 
    //all polls that should be displayed on homepage feed
    this.feed = await initializeData()
    await this.feed.polls.sort((a, b) => new Date(b.voteExpire) - new Date(a.voteExpire))
    console.log(this.feed.polls.sort((a, b) => new Date(a.voteExpire) > new Date(b.voteExpire)))
  },
  
  }
</script>
<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@import url('https://fonts.googleapis.com/css2?family=Oxygen&display=swap');


* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
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
}

#nav {
  background: #fff;
  z-index: 1;
  display: flex;
  //height: 10vh;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  top: 0;
}


#nav > section > a > h1 {
  width: 6ch;
  color: #4547e4;
  margin-right: 20px;
}
#nav > section > input {
  width: 75%;
  height: 2.5rem;
  border-radius: 0 5px 5px 0;
  padding-left: 10px;
  border: none;
  background: #f6f7f8;
}
.link-border {
  cursor: pointer;
 
 &:hover {
   background: rgb(146, 158, 170);
 }
}
.nav-search-wrapper {
  width: 70%;
  display: flex;
  align-items: center;

  select {
    
    height: 2.5rem;
    border-radius: 5px 0 0 5px;
    padding-left: 10px;
    border: none;
    background: #f6f7f8;
  }
}
.menu-buttons, .login-signup-options {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  width: 27%;
}


.login-signup-options > .login {
  min-width: 4.5rem;
  height: 2rem;
  border-radius: 25px;
  border: 2px solid #4547e4;
  background: #fff;
  font-weight: bold;
  max-width: 11rem;
  width: 40%;
}

.login-signup-options > .signup {
  min-width: 4.5rem;
  height: 2rem;
  border-radius: 25px;
  background: #4547e4;
  color: #fff;
  border: none;
  font-weight: bold;
  max-width: 11rem;
  width: 40%;
}
.menu-buttons > .show-options-menu {
  min-width: 4.5rem;
  height: 2rem;
  border-radius: 25px;
  border: 2px solid #4547e4;
  background: #fff;
  font-weight: bold;
  max-width: 11rem;
  width: 40%;
}

.menu-buttons > .logout {
  min-width: 4.5rem;
  //width: 5.5rem;
  height: 2rem;
  border-radius: 25px;
  background: #4547e4;
  color: #fff;
  border: none;
  font-weight: bold;
  max-width: 11rem;
  width: 40%;
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
@media only screen and (max-width: 770px) {
  #nav {
    display: block;
  }
  .nav-search-wrapper {
    width: 95%;
    
  }
  
  .menu-buttons{
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 3.5rem;
  }
}

</style>
