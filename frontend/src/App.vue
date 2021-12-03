<template>
<section>
  <NavHeader /> 
  <router-view />
</section>
</template>
<script>
import NavHeader from "./components/NavHeader.vue"
export default {
  data() {
    return {
      test: "data"
    }
  },
  components: {
    NavHeader
  },
  methods: {
    testFunc() {
      console.log(this.test)
    }
  }
}
</script>
<style>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background: #fff;
  display: flex;
  height: 3.8rem;
  justify-content: space-between;
  align-items: center;
}
#nav > * {
  margin: 0 0.5rem;
}

#nav > h1 {
  min-width: 10ch;
}
#nav > input {
  width: 50%;
  height: 2.5rem;
  border-radius: 5px;
  padding-left: 10px;
  border: none;
  background: #f6f7f8;
}

#nav > .login {
  min-width: 5.5rem;
  height: 2rem;
  border-radius: 25px;
  border: 2px solid #1b1eb3;
  background: #fff;
  font-weight: bold;
}

#nav > .signup {
  min-width: 5.5rem;
  height: 2rem;
  border-radius: 25px;
  background: #1b1eb3;
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
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
