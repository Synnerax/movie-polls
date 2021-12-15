<template>
  <section class="joined-communitys">
    <h1>Joined communitys:</h1>
    <section class="user-list-wrapper">
      <article v-for="(community, index) in communitys" :key="index">
        <span @click="checkOutCommunity(community.id)" >{{community.name}}</span>
        <span>Members: {{community.members.length}}</span>
      </article>
    </section>
  </section>
</template>

<script>

import {fetchUsersCommunitys} from '../firebase-config'
export default {
  name: "Joined-Communitys",
  props: ["joinedCommunitys"],
  data() {
    return {
      fetchedList: []
    }
  },
  methods: {
      checkOutCommunity(id){
      this.$router.push({name: "Community", params: {id: id}})

    }
  },
  computed: {
    communitys: function () {
      return this.fetchedList ? this.fetchedList : "failed to fetch groups"
    },
  },
  async mounted() {
    this.fetchedList = await fetchUsersCommunitys(this.$route.params.id)

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
    width: 25%;
  }


  article {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin: 10px;

    &:nth-child(odd){
      background: rgb(207, 207, 207);
    }
    span {
      border-bottom: 1px solid rgb(204, 204, 204);
    }
  }
}
</style>