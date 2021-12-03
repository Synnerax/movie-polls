<template>
    <div id="nav">
    <router-link to="/"><h1>Movie Polls</h1></router-link>
    <input type="text" placeholder="Search Archive">
    <button class="login"><router-link to="/login"> Login </router-link></button>
    <button v-on:click="testFunc" class="signup"><router-link to="/sign-up">Sign up</router-link></button>
    <div class="profile-access">
    <div  class="profile-menu"></div>
    <i>&or;</i>
    </div>
    <!--<router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    -->
  </div>
</template>

<script>
export default {
  name: "navigation-header"
}
</script>

<style>

</style>