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
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  row-gap: 1rem;
}

.right-section {
    align-self: flex-end;
    min-width: 15rem;
    width: 20vw;
    min-height: 20rem;
    background: #fff;
    border-radius: 10px;
    padding: 1rem;
    text-align: left;
}

.discord-widget {
  width: 100%;
  height: 350px;
}
</style>
