<template>
  <section class="groups-feed">
    <h1>New Groups:</h1>
    <section class="community-links">
    <p v-for="community in communitys" :key="community.id" @click="checkOutCommunity(community.id)">{{community.name}}</p>
    </section>
  </section>
</template>

<script>
export default {
  name: "groups-feed",
  props: [
    "communitys"
  ],
  methods: {
    checkOutCommunity(id){
      this.$router.push({name: "Community", params: {id: id}})

    }
  }
}
</script>

<style lang="scss" scoped>

  .groups-feed {
    height: 45%;
    
    h1 {
      margin-bottom: 15px;
    }

    .community-links {
      height: 80%;
      overflow: hidden scroll;
      display: flex;
      flex-direction: column;
      gap: 20px;

      p {
        cursor: pointer;
        border-bottom: 2px solid #e5e5e5;
      }
    }
  }
</style>