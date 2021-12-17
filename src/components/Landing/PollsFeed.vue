<template>
  <section class="polls-feed">
    <section class="filter-feed-wrapper">

    </section>
    <Poll @click="checkOutPoll(poll.title)" v-for="(poll, index) in polls" :key="index" :poll="poll"  class="poll-wrapper" /> 
    
  </section>
</template>

<script>
import Poll from "./Poll.vue"
export default {
  props: ["polls"],
  data() {
    return {
      pollsOrder: this.polls
    }
  },
  methods: {
      checkOutPoll(title){
      this.$router.push({name: "Poll Voting", params: {title: title}})
    }
  },
  components: {
    Poll
  },
  computed: {
    /*sortedByVotes: function () {
        
      return this.pollsOrder.sort((a, b) => new Date(a.date) - new Date(b.date))
      //return [...this.polls.filter(poll => new Date(poll.voteExpire) < new Date()), ...this.polls.filter(poll => new Date(poll.voteExpire) > new Date())]
    }
  */
  },
  mounted(){
    this.pollsOrder.sort((a, b) => new Date(a.date) - new Date(b.date))
  }
}
</script>

<style lang="scss" scoped>
  .polls-feed {
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    min-width: 16rem;
    width: 60vw;
    min-height: 30rem;
    //background: #fff;
    border-radius: 10px;
    gap: 1rem;
    padding: 1rem;

    .poll-wrapper {
      cursor: pointer;
      text-align: left;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
      transition: all 0.3s cubic-bezier(.25,.8,.25,1);
      //border: 1px solid;
      //margin: 1rem;
      //padding: 15px;
      //flex: 0 0 100%;

      &:hover {
        border: 1px solid;

      }
      p {
        max-width: 25ch;
      }
    }
  }
</style>