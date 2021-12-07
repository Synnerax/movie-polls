<template>
  <section class="groups-feed">
    <h1>New Groups:</h1>
    <section class="community-links">
    <a v-for="community in communitys" :key="community.id" :href="`/group/${community.id}`">{{community.group.name}}</a>
    </section>
  </section>
</template>

<script>
export default {
  name: "groups-feed",
  props: [
    "communitys"
  ]
}
</script>

<style lang="scss" scoped>

  .groups-feed {
    min-width: 15rem;
    width: 20vw;
    height: 20rem;
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
    }
  }
</style>