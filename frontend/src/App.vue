<template>
  <NavHeader :loggedIn="loggedIn"/> 
  <router-view :userID="user" />
</template>
<script>
import NavHeader from "./components/NavHeader.vue"
import { auth, loadGroups } from "./firebase-config"
import { onAuthStateChanged } from "firebase/auth"
export default {
  data() {
    return {
      test: "data",
      loggedIn: false,
      user: "",
      userGroups: []
      
    }
  },
  components: {
    NavHeader
  },
  methods: {
    testFunc() {
      console.log(this.test)
    }
  },
  created(){
    onAuthStateChanged(auth, (user) => {
      console.log("checked")
      if(user) {
        this.loggedIn = true
        this.user = user.uid
        console.log("Current user: ", user)
      } else {
        this.loggedIn = false
      }
    })
    loadGroups().then(groups => {
      console.log("this is groups: ", groups)
      this.userGroups = groups
    }).catch(error => {
      console.log(error)
    })
    
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Oxygen&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
}

*:focus {
  /*Removes focus from input boxes and others*/
}

body {
  background: #dae0e6;
  
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
  padding: 0.75rem 0;
  background: #fff;
  display: flex;
  height: 8vh;
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
  justify-content: space-evenly;
  align-items: center;
  width: 25%;
}
.menu-buttons > .login {
  min-width: 5.5rem;
  height: 2rem;
  border-radius: 25px;
  border: 2px solid #4547e4;
  background: #fff;
  font-weight: bold;
}

.menu-buttons > .signup {
  min-width: 5.5rem;
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
