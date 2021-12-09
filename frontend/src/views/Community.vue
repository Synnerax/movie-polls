<template>
  <section class="community">
    <button class="join-community" @click="joinCommunity(userID, this.$route.params.id)">Join community</button>
  </section>
</template>

<script>
import { joinCommunity } from "../firebase-config"
export default {
  name: "community-view",
  props: ["userID"],
  methods: {
    joinCommunity
  }
}
</script>

<style lang="scss" scoped>
.community {
  height: 100%;
  width: 100%;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  .join-community {
    width: 7rem;
    height: 3rem;
    background: #fff;
  }
}
</style>