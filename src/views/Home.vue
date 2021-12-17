<template>
  <div class="home">
    <PollsFeed :polls="pollsFeed"/>
    <section class="right-section">
    <GroupsFeed :communitys="communitys"/>
    <iframe class="discord-widget" src="https://discord.com/widget?id=920761173220139019&theme=dark" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import GroupsFeed from '../components/Landing/GroupsFeed.vue';
import PollsFeed from '../components/Landing/PollsFeed.vue';

export default {
  name: "Home",
  props: [
    "communitys",
    "pollsFeed"
  ],
  components: { 
    GroupsFeed,
    PollsFeed
    }
  
};
</script>

<style lang="scss" scoped>
.home {
  padding-top: 3rem;
  //padding: 3rem;
  display: flex;
  justify-content: space-evenly;
  //flex-wrap: wrap-reverse;
  row-gap: 1rem;
}

.right-section {
    //align-self: flex-end;
    min-width: 15rem;
    width: 22vw;
    gap: 15px;
    max-height: 80vh;
    background: #fff;
    border-radius: 10px;
    padding: 1rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.discord-widget {
  width: 100%;
  height: 350px;
}

@media screen and (max-width: 600px) {
  .home {
    flex-wrap: wrap-reverse;
    justify-content: center;
  }
    .right-section {
      max-height: none;
      align-self: flex-end;
    }
  
}
</style>
