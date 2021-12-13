<template>
  <section class="polls-feed">
    <Poll @click="checkOutPoll(poll.title)" v-for="(poll, index) in polls" :key="index" :poll="poll"  class="poll-wrapper" /> 
    
  </section>
</template>

<script>
import Poll from "./Poll.vue"
export default {
  props: ["polls"],
  methods: {
      checkOutPoll(title){
        console.log("Imma fiering my laza ")
      this.$router.push({name: "Poll Voting", params: {title: title}})
      console.log(this.$route.params.title)
    }
  },
  components: {
    Poll
  }
}
</script>

<style lang="scss" scoped>
  .polls-feed {
    flex-wrap: wrap;
    display: flex;
    min-width: 25rem;
    width: 67vw;
    min-height: 30rem;
    background: #fff;
    border-radius: 10px;

    .poll-wrapper {
      cursor: pointer;
      text-align: left;
      border: 1px solid;
      margin: 1rem;
      padding: 15px;
      flex: 1 1 30%;
      


      p {
        max-width: 25ch;
      }
    }
  }
</style>