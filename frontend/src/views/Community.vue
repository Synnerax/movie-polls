<template>
  <section class="community-wrapper">
    <section class="community-feed">
      <h1>Where does it come from?</h1>
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </p>
    </section>
    <section class=".member-list">
      <div class="join-community-wrapper">       
        <button
        class="join-community"
        @click="joinCommunity(userID, this.$route.params.id)"
      >
        Join community
      </button>
      </div>

      <GroupsFeed class="border" :communitys="communitys"/>
    </section>
      
  </section>
</template>
<script>
import { joinCommunity } from "../firebase-config";
import GroupsFeed from '../components/Landing/GroupsFeed.vue';
export default {
  name: "community-view",
  props: ["userID", "communitys"],
  components: { 
    GroupsFeed,
    },
  methods: {
    joinCommunity,
  },
  data() {
    return {
      url: this.$route.params.id,
    };
  },
};
</script>

<style lang="scss" scoped>
.community-wrapper {
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  row-gap: 1rem;
}
.member-list {
  align-self: flex-end;
  min-width: 15rem;
  width: 20vw;
  height: 20rem;
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  text-align: left;
}
.community-feed {
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  min-width: 25rem;
  width: 67vw;
  min-height: 30rem;
  background: #fff;
  border-radius: 10px;
  .join-community {
    width: 7rem;
    height: 3rem;
    background: #fff;
  }
}
h1{
  align-self: center;
}
.border { border-radius: 0px 0px 10px 10px;}
.join-community {
    min-width: 1.5rem;
    width: 5.5rem;
    height: 2rem;
    border-radius: 25px;
    background: #4547e4;
    color: #fff;
    border: none;
    font-weight: bold;
}
.join-community-wrapper {
  background: #fff;
  border-radius: 10px 10px 0px 0px;
}
</style>