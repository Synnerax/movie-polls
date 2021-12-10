<template>
  <section class="polls-feed">
    <article @click="checkOutPoll(poll.title)" v-for="(poll, index) in polls" :key="index"  class="poll-wrapper">
      <!--This should return group name and not group ID-->
      <p>c/{{poll.groupName}}</p>
      <p>{{poll.title}} - Votes: {{poll.voted.length}}</p>
      <section v-for="(movie, index) in poll.movieList" :key="index">
        <p>{{movie.title}} - {{movie.release}} - {{movie.director}}</p>
      </section>
    </article>
  </section>
</template>

<script>
export default {
  props: ["polls"],
  methods: {
      checkOutPoll(title){
        console.log("Imma fiering my laza ")
      this.$router.push({name: "Poll Voting", params: {title: title}})
      console.log(this.$route.params.title)
    }
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