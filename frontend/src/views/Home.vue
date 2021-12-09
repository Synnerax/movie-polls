<template>
  <div class="home">
    <PollsFeed :polls="pollsFeed"/>
    <GroupsFeed :communitys="communitys"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GroupsFeed from '../components/GroupsFeed.vue';
import PollsFeed from '../components/PollsFeed.vue';

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
</style>
