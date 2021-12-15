<template>
  <section class="joined-communitys">
    <h1>Joined communitys:</h1>
    <section class="user-list-wrapper">
      <article v-for="(community, index) in communitys" :key="index">
        <span @click="checkOutCommunity(community.id)" >{{community.name}}</span>
      </article>
    </section>
  </section>
</template>

<script>
export default {
  name: "Joined-Communitys",
  props: ["joinedCommunitys"],
  methods: {
      checkOutCommunity(id){
      this.$router.push({name: "Community", params: {id: id}})

    }
  },
  computed: {
    communitys: function () {
      return this.joinedCommunitys ? this.joinedCommunitys : "failed to fetch groups"
    }
  }
}
</script>

<style lang="scss" scoped>

.joined-communitys {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .user-list-wrapper {
    background: #fff;
    width: 50%;
  }


  article {
    cursor: pointer;

      margin: 10px;
    span {
      border-bottom: 1px solid rgb(204, 204, 204);
    }
  }
}
</style>