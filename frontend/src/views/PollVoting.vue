<template>
  <section class="voting">
    <section class="poll-voting-view">
      <h1>
        {{this.poll.title}}
      </h1>
      <p>Votes: {{this.countedVotes}}</p>
    <section v-for="(movie, index) in this.poll.movieList" :key="index">
      <p>{{movie.title}}</p>
      <p>{{movie.director}}</p>
      <p>{{movie.release}}</p>
    </section>
    </section>
  </section>
</template>

<script>

export default {
  data() {
    return {
      poll: {
        voted: [ "hej"]
    }}
  },
  props: ["pollsFeed"],
  mounted() {
    this.pollsFeed.forEach((poll) => {
      if(poll.title === this.$route.params.title) {
        this.poll = poll
      }
    })
    console.log(this.poll.voted.length)
  },
  computed: {
    countedVotes() {
      let check = this.poll ? this.poll.voted.length : "Error getting votes"
      return check
    }
  }
}
</script>

<style lang="scss">

.voting {
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  .poll-voting-view {
    text-align: left;
    min-width: 15rem;
    width: 75vw;
    min-height: 19rem;
    height: 40vw;
    background: #fff;
  }
}
</style>