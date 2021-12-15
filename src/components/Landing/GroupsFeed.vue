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
    align-self: flex-end;
    min-width: 15rem;
    width: 20vw;
    min-height: 20rem;
    background: #fff;
    border-radius: 10px;
    padding: 1rem;
    text-align: left;

    h1 {
      margin-bottom: 15px;
    }

    .community-links {
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 15px;

      p {
        cursor: pointer;
        border-bottom: 2px solid #e5e5e5;
      }
    }
  }
</style>